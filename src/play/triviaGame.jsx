import React from "react"
import { TriviaQuestion } from "./triviaQuestion"

export function TriviaGame() {
    const [gameRunning, setGameRunning] = React.useState(false)

    return (
        <div className="col-12 col-md-10 col-xl-8 d-flex flex-column align-items-center justify-content-center" 
        style={{height: "50vh"}}>
            <TriviaQuestion />
            
            <div className="mb-3">Seconds left: 15</div>
            
            <div className="d-flex w-100 mb-4">
                <input type="text" className="form-control me-2 mt-5" placeholder="Answer" />
                <button className="btn btn-danger mt-5">Skip</button>
            </div>
            
            <div className="w-100 d-flex justify-content-between">
                <div>Score: 0</div>
                <button className="btn btn-primary">Submit</button>
                <div>Skips Left: 3</div>
            </div>
        </div>
    )
}