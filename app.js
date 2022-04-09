const express = require("express");
const app = express();
const data = require("./data.json");
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send(data);
});

app.get("/:release", (req, res) => {
    res.status(200).send(data.filter(el => el.release == req.params.release));
});

app.listen(PORT, () => console.log("Server is listening on port:", PORT))