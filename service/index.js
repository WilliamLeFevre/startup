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





function updateScores(newScore) {
    let found = false
    for (const [i, prevScore] of scores.entries()) {
        if (newScore.score > prevScore.score) {
            scores.splice(i, 0, newScore)
            found = true
            break
        }
    }

    if (!found) {
        scores.push(newScore);
    }

    if (scores.length > 10) {
        scores.length = 10
    }

    return scores
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = {
        username: username, 
        password: passwordHash, 
        token: uuid.v4(), 
    }
    users.push(user)

    return user
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})