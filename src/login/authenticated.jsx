import React from "react"

export function Authenticated({onLogout}) {
    function logout() {
        localStorage.removeItem("userName")
        onLogout()
    }

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={() => logout()}>Logout</button>
        </div>
    )
}