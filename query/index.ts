import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

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

const handleEvent = ({type, data}: event) => {
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
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    handleEvent(req.body);
    res.send({});
});

app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

    const res = await axios.get<event[]>('http://localhost:4005/events');
    res.data.forEach((e: event) => {
        console.log('Processing event: ', e.type);
        handleEvent(e);
    })
});
