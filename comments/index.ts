import express from 'express';
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

const PORT = 4001;

const app = express();
app.use(bodyParser.json())

interface comment {
    id: string;
    content: string;
}

const commentsByPostId: {[id: string]: comment[]} = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments: comment[] = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = comments;

    res.status(201);
    res.send(comments);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
