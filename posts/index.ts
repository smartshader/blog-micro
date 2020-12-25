import express from 'express';
import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
    id: string;
    title: string;
}

const posts: {[id: string]: Post} = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {id, title};

    res.status(StatusCodes.ACCEPTED);
    res.send(posts[id]);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
