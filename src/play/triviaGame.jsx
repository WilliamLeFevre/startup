import React from "react"
import { TriviaQuestion } from "./triviaQuestion"
import { TriviaResponse } from "./triviaResponse"

export function TriviaGame() {
    const [gameRunning, setGameRunning] = React.useState(false)

    return (
        <div className="col-12 col-md-10 col-xl-8 d-flex flex-column align-items-center justify-content-center" 
        style={{height: "50vh"}}>
            {gameRunning === true && (
                <TriviaQuestion />
            )}
            {gameRunning === true && (
                <TriviaResponse />
            )}
        </div>
    )
}