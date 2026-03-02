import React from "react"

export function OnlineUsers({userName, score}) {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        setUsers(getOnlineUsers())
        const interval = setInterval(() => {
            setUsers(getOnlineUsers())
        }, 4000)

        return () => clearInterval(interval)
    }, [score])

    function getOnlineUsers() {
        const fruits = [
            "Apple",
            "Banana",
            "Mango",
            "Pineapple",
            "Strawberry",
            "Orange",
            "Grape",
            "Peach",
            "Kiwi",
            "Watermelon"
        ];

        console.log(score)
        let onlineUsers = [{userName: userName, score: score}]
        console.log(onlineUsers)
        for (let i=0; i < Math.floor(Math.random() * 10); i++) {
            let randomUserName = fruits[Math.floor(Math.random() * fruits.length)] + "Flash";
            let randomScore = Math.floor(Math.random() * 100)
            onlineUsers = [...onlineUsers, {userName: randomUserName, score: randomScore}]
        }
        
        
        return onlineUsers
    }

    const userRows = []
    for (let i=0; i < users.length; i++) {
        userRows.push(
            <li className="fs-5">{users[i].userName}-{users[i].score}</li>
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