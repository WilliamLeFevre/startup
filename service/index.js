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


apiRouter.post("/auth/create", async (req, res) => {
    if (await findUser("username", req.body.username)) {
        res.status(409).send({msg: "Existing User"})
    } else {
        const user = await createUser(req.body.username, req.body.password)
        setAuthCookie(res, user.token)
        res.send({username: user.username})
    }
})

apiRouter.post("/auth/login", async (req, res) => {
    const user = await findUser("username", req.body.username)
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4()
            setAuthCookie(res, user.token)
            res.send({username: user.username})
            return
        }
    }
    res.status(401).send({msg: "Unauthorized"})
})



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

async function findUser(field, value) {
    if (!value) return null

    return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true, 
        httpOnly: true, 
        sameSite: "strict", 
    })
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})