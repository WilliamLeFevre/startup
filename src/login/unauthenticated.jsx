import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState("")

    async function loginUser() {
        let users = JSON.parse(localStorage.getItem("users") || "[]")

        let user_found = false
        for (let i=0; i < users.length; i++) {
            if (users[i].name.toLowerCase() === userName.toLowerCase()) {
                if (password === users[i].password) {
                    localStorage.setItem("userName", userName)

                    let leaderboardScores = JSON.parse(localStorage.getItem("scores") || "[]")

                    let score_found = false
                    for (let i=0; i < leaderboardScores.length; i++) {
                        if (leaderboardScores[i].name === userName) {
                            localStorage.setItem("highScore", leaderboardScores[i].score)
                            score_found = true;
                            break;
                        }
                    }
                    if (!score_found) {
                        localStorage.setItem("highScore", 0)
                    }


                    props.onLogin(userName)
                    console.log(localStorage)
                } else {
                    alert("Incorrect password")
                }

                user_found = true;
                break;
            }
        }
        if (!user_found) {
            alert("Username is incorrect")
        }


        
    }

    async function createUser() {
        let users = JSON.parse(localStorage.getItem("users") || "[]")

        let found = false
        for (let i=0; i < users.length; i++) {
            if (users[i].name.toLowerCase() === userName.toLowerCase()) {
                found = true;
                break;
            }
        }
        if (!found) {
            localStorage.setItem("userName", userName)
            localStorage.setItem("users", JSON.stringify([...users, {name: userName, password: password}]))
            props.onLogin(userName)
        } else {
            alert("Username taken!")
        }

    }

    return (
        <div className="w-50 mx-auto">
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control mb-4" placeholder="Enter username" 
                value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="form-group mb-4">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary me-2"
            onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
            <button type="button" className="btn btn-primary" 
            onClick={() => createUser()} disabled={!userName || !password}>Sign Up</button>
        </div>
    );
}