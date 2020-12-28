import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4005;

interface event {
    type: string;
    data: any;
}

const app = express();
app.use(bodyParser.json());

const events: event[] = [];

app.post('/events', (req, res) => {
    const event: event = req.body;
    events.push(event);

    axios.post<event>('http://posts:4000/events', event);
    axios.post<event>('http://comments:4001/events', event);
    axios.post<event>('http://query:4002/events', event);
    axios.post<event>('http://moderation:4003/events', event);

    res.send({status: 'Ok'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
