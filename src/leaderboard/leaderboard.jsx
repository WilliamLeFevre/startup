import React from "react";

export function Leaderboard() {
    const [scores, setScores] = React.useState([])

    React.useEffect(() => {
        const scoresText = localStorage.getItem("scores")
        if (scoresText) {
            setScores(JSON.parse(scoresText))
        }
    }, [])

    const scoreRows = []
    if (scores.length) {
        for (const [i, score] of scores.entries()) {
            scoreRows.push(
                <tr>
                    <th scope="row">{i}</th>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                </tr>
            )
        }
    } else {
        scoreRows.push(
            <tr key="0">
                <td colSpan="3">Be the first on the leaderboard!</td>
            </tr>
        )
    }

    return (
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="display-1">Leaderboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-8 text-center">
                        <table className="table table-bordered" style={{height: "70vh"}}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoreRows}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4 d-none d-md-flex flex-column align-items-center justify-content-around" style={{height: "50vh"}}>
                        <div className="h1 bg-light p-5 border border-dark">Your rank: #30</div>
                        <div className="h1 bg-light p-5 border border-dark">Your Score: 2</div>
                    </div>
                    
                </div>
                
            </div>
    
        </main>
    );
}