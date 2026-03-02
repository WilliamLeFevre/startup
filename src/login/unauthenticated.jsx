import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState("")

    async function loginUser() {
        localStorage.setItem("userName", userName)
        props.onLogin(userName)
        console.log(localStorage)
    }

    async function createUser() {
        localStorage.setItem("userName", userName)
        props.onLogin(userName)
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