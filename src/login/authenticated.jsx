import React from "react"

export function Authenticated({onLogout}) {
    function logout() {
        fetch(`/api/auth/logout`, {
            method: "delete", 
        })
            .catch(() => {

            })
            .finally(() => {
                localStorage.removeItem("userName")
                onLogout()
            })
    }

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={() => logout()}>Logout</button>
        </div>
    )
}