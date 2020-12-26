import express from 'express';
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from 'cors';
import axios from "axios";

const PORT = 4001;

const app = express();
app.use(bodyParser.json())
app.use(cors());

interface comment {
    id: string;
    content: string;
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
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = comments;

    axios.post<event>('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201);
    res.send(comments);
});

app.post('/events', (req, res) => {
    const event: event = req.body;
    console.log('Received Event', event.type);

    res.send({});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
