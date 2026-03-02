import React from "react"
import { TriviaField} from "./triviaField"


export function TriviaGame({highScore, setHighScore, score, setScore}) {
    const [gameRunning, setGameRunning] = React.useState(false)
    const [gameLost, setGameLost] = React.useState(false)
    

    function startGame() {
        setGameRunning(true)
        setGameLost(false)
    }

    function loseGame() {
        setGameRunning(false)
        setGameLost(true)
        if (score > highScore) {
            localStorage.setItem("highScore", score)
            setHighScore(score)
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