import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

interface event {
    type: string;
    data: any;
}

app.post('/events', (req, res) => {
    const { type, data }: event = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? Status.REJECTED : Status.APPROVED;
        axios.post('http://eventbus:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        });
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
