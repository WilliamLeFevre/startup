import React from "react";
import { OnlineUsers } from "./onlineUsers";
import { TriviaGame } from "./triviaGame";

export function Play({userName}) {
    const [highScore, setHighScore] = React.useState(0)
    const [score, setScore] = React.useState(0)

    function loadHighScore() {
        fetch("/api/scores")
            .then((res) => res.json())
            .then((scores) => {
                const userScore = scores
                    .filter((s) => s.name === userName)
                    .reduce((max, s) => Math.max(max, s.score), 0);
                setHighScore(userScore);
            });
    }

    React.useEffect(() => {
        loadHighScore()
    }, [userName]);
    
    return (
        <main>
            <div className="container-fluid">
                <div className="row mt-4">

                    <OnlineUsers userName={userName} score={score}/>

                    <TriviaGame 
                        highScore={highScore} 
                        setHighScore={(s) => setHighScore(s)}
                        score={score} 
                        setScore={(newScore) => setScore(newScore)} 
                        userName={userName}
                        onGameEnd={loadHighScore}
                    />

                    <div className="col-2 d-none d-md-block p-3">
                        <h3>Current User: {userName}</h3>
                        <h5>High Score: {highScore}</h5>
                    </div>
                </div>
            </div>
        </main>
    );
}