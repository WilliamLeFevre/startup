import React, { use } from "react"
import { TriviaField} from "./triviaField"


export function TriviaGame({highScore, setHighScore, score, setScore, userName}) {
    const [gameRunning, setGameRunning] = React.useState(false)
    const [gameLost, setGameLost] = React.useState(false)
    

    function startGame() {
        setGameRunning(true)
        setGameLost(false)
        setScore(0)
    }

    function loseGame() {
        setGameRunning(false)
        setGameLost(true)
        if (score > highScore) {
            localStorage.setItem("highScore", score)
            setHighScore(score)

            let leaderboardScores = JSON.parse(localStorage.getItem("scores") || "[]")

            let found = false
            for (let i=0; i < leaderboardScores.length; i++) {
                if (leaderboardScores[i].name === userName) {
                    leaderboardScores[i].score = score
                    found = true;
                    break;
                }
                
            }
            if (!found) {
                leaderboardScores = [...leaderboardScores, {name: userName, score: score}]
                console.log("should have written")
            }
            leaderboardScores.sort((a, b) => b.score - a.score);
            localStorage.setItem("scores", JSON.stringify(leaderboardScores))
        }
        
    }

    return (
        <div className="col-12 col-md-10 col-xl-8 d-flex flex-column align-items-center justify-content-center" 
        style={{height: "50vh"}}>
            {gameRunning === true && (
                <TriviaField loseGame={() => loseGame()} score={score} 
                setScore={(newScore) => setScore(newScore)}/>
            )}
            {gameLost === true && (
                <div>
                    <h1>You lose!</h1>
                    <h2>Score: {score}</h2>
                </div>
            )}
            {gameRunning === false && (
                <button className="btn btn-lg btn-primary me-2" 
                onClick={() => startGame()}>Start Game</button>
            )}
        </div>
    )
}