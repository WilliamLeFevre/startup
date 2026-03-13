const express = require("express");
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const uuid = require("uuid")

const app = express();
const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.get(/.*/, (_req, res) => {
    res.send({msg: "Trivia Survival Service"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})