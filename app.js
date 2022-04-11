const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./data.json");
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send(data);
});

app.get("/:release", (req, res) => {
    res.status(200).send(data.filter(el => el.release == req.params.release));
});

app.listen(PORT, () => console.log("Server is listening on port:", PORT))