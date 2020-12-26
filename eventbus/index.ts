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

app.post('/events', (req, res) => {
    const event: event = req.body;

    axios.post<event>('http://localhost:4000/events', event);
    axios.post<event>('http://localhost:4001/events', event);
    axios.post<event>('http://localhost:4002/events', event);
    axios.post<event>('http://localhost:4003/events', event);

    res.send({status: 'Ok'});
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
