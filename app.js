const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express();
const data = require("./data.json");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/fake-rest/", (req, res) => {
    let latestId = Math.max.apply(Math, data.map(el => el.id));
    data.push({ id: latestId + 1, ...req.body });
    res.status(201).send(data);
});

app.get("/fake-rest/", (req, res) => {
    res.status(200).send(data);
});

app.get("/fake-rest/:id", (req, res) => {
    res.status(200).send(data.filter(el => el.id == req.params.id));
});

app.put("/fake-rest/:id", (req, res) => {
    let found = data.find(el => el.id == req.params.id);
    if (found) {
        found.movie = req.body.movie;
        found.release = req.body.release;
        let index = data.findIndex(el => el.id === found.id);
        if (index !== -1) data[index] = found;
        res.status(200).send(data);
    }
    else {
        res.status(404).send(null);
    }
});

app.delete("/fake-rest/:id", (req, res) => {
    let found = data.find(el => el.id == req.params.id);
    if (found) {
        let index = data.findIndex(el => el.id === found.id);
        if (index > -1) data.splice(index, 1); // 2nd parameter means remove one item only
        res.status(200).send(data);
    }
    else {
        res.status(404).send(null);
    }
});

app.listen(PORT, () => console.log("Server is listening on port:", PORT))