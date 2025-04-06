const express = require("express");
const cors = require("cors");
const { data } = require("./db")

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>res.json(data));

app.listen(4000, () =>
    console.log("servidor coreindo en http://localhost:4000")
);