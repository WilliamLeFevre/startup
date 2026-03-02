import React from "react"
import { TriviaField} from "./triviaField"


export function TriviaGame() {
    const [gameRunning, setGameRunning] = React.useState(false)

    return (
        <div className="col-12 col-md-10 col-xl-8 d-flex flex-column align-items-center justify-content-center" 
        style={{height: "50vh"}}>
            {gameRunning === true && (
                <TriviaField />
            )}
            {gameRunning === false && (
                <button className="btn btn-lg btn-primary me-2" 
                onClick={() => setGameRunning(true)}>Start Game</button>
            )}
        </div>
    )
}