import React from "react";
import { OnlineUsers } from "./onlineUsers";
import { TriviaGame } from "./triviaGame";

export function Play({userName}) {
    const [highScore, setHighScore] = React.useState(localStorage.getItem("highScore") || 0)
    
    
    return (
        <main>
            <div className="container-fluid">


                <div className="row mt-4">

                    <OnlineUsers  userName={userName}/>


                    <TriviaGame highScore={highScore} setHighScore={(score) => setHighScore(score)}/>


                    <div className="col-2 d-none d-md-block p-3">
                        <h3>Current User: {userName}</h3>
                        <h5>High Score: {highScore}</h5>
                    </div>
                </div>
            </div>
        </main>
    );
}