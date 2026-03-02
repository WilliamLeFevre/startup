import React from "react"

export function OnlineUsers() {
    const [users, setUsers] = React.useState([])


    const userRows = []
    for (let i=0; i < users.length; i++) {
        userRows.push(
            <li className="fs-5">{users[i]}</li>
        )
    }

    return (
        <div className="col-2 d-none d-xl-block p-3">
            <h5>Online Users</h5>
            <ul className="list-unstyled text-nowrap border border-dark p-1">
                {userRows}
            </ul>
        </div>
    )
}