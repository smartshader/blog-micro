import express from 'express';
import { randomBytes } from "crypto";
import { StatusCodes } from "http-status-codes";
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from "axios";

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Post {
    id: string;
    title: string;
}

interface event {
    type: string;
    data: any;
}

const posts: Record<string, Post> = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {id, title};

    await axios.post<event>('http://eventbus:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(StatusCodes.ACCEPTED);
    res.send(posts[id]);
});

app.post('/events', (req, res) => {
    const event: event = req.body;
    console.log('Received Event', event.type);

    res.send({});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
