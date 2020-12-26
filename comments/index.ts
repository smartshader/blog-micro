import express from 'express';
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from 'cors';
import axios from "axios";

const PORT = 4001;

const app = express();
app.use(bodyParser.json())
app.use(cors());

enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

interface comment {
    id: string;
    content: string;
    status: Status;
}

interface event {
    type: string;
    data: any;
}

const commentsByPostId: Record<string, comment[]> = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments: comment[] = commentsByPostId[req.params.id] || [];
    const comment = { id: commentId, content, status: Status.PENDING };
    comments.push(comment)
    commentsByPostId[req.params.id] = comments;

    axios.post<event>('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...comment,
            postId: req.params.id
        }
    });

    res.status(201);
    res.send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data }: event = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment !== undefined ? comment.status = status : null;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                ...comment,
                postId
            }
        })
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
