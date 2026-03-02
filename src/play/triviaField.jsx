import React from "react";

export function TriviaField() {

    return (
        <>
            <div className="h3 mb-4 bg-light p-3 border border-dark">
                Question: How many coins does Mario have to earn before he gets a 1up?
            </div>

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
        </>
    )
}