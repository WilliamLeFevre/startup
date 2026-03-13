const express = require("express");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const uuid = require("uuid")

const app = express();
const authCookieName = "token";

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})