import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface event {
    type: string;
    data: any;
}

interface comment {
    id: string;
    content: string;
    status: string;
}

interface post {
    id: string;
    title: string;
    comments: comment[];
}

const posts: Record<string, post> = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data }: event = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] }
    }

    if (type === 'CommentCreated') {
        const {id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const comments = posts[postId];
        const comment = comments.comments.find(comment => comment.id === id);
        if (comment !== undefined) {
            comment.status = status;
            comment.content = content;
        }
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
