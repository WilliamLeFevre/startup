import React from "react";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName)
    const [password, setPassword] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState("")

    async function loginUser() {
        loginOrCreate(`/api/auth/login`)
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`)
    }

    async function loginOrCreate(endpoint) {
        setErrorMsg("")
        const response = await fetch(endpoint, {
            method: "post", 
            body: JSON.stringify({username: userName, password: password}), 
            headers: {
                "Content-type": "application/json; charset=UTF-8", 
            }, 
        })
        if (response?.status === 200) {
            // Do NOT store credentials in localStorage — auth is handled via httpOnly cookie
            props.onLogin(userName)
        } else {
            const body = await response.json()
            setErrorMsg(body.msg || "Login failed. Please try again.")
        }
    }

    return (
        <div className="w-50 mx-auto">
            {errorMsg && (
                <div className="alert alert-danger" role="alert">{errorMsg}</div>
            )}
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