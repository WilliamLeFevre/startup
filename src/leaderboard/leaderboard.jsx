import React from "react";

export function Leaderboard({userName}) {
    const [scores, setScores] = React.useState([])
    const [userScore, setUserScore] = React.useState(0)
    const [userRank, setUserRank] = React.useState(0)

    React.useEffect(() => {
        fetch("/api/scores")
            .then((response) => response.json())
            .then((scores) => {
                // Deduplicate: keep only the best score per user
                let filtered_scores = []
                let displayed = []
                for (let i = 0; i < scores.length; i++) {
                    if (displayed.includes(scores[i].name) === false) {
                        filtered_scores.push(scores[i])
                        displayed.push(scores[i].name)
                    }
                }
                setScores(filtered_scores)

                for (let i = 0; i < filtered_scores.length; i++) {
                    if (filtered_scores[i].name === userName) {
                        setUserRank(i + 1)
                        setUserScore(filtered_scores[i].score)
                        break
                    }
                }
            });
        
    // Re-fetch whenever the component mounts (page navigation) or userName changes
    }, [userName]);

    const scoreRows = []
    if (scores.length) {
        for (let i = 0; i < 10; i++) {
            if (scores[i]) {
                scoreRows.push(
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{scores[i].name}</td>
                        <td>{scores[i].score}</td>
                    </tr>
                )
            } else {
                scoreRows.push(
                    <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                )
            }
        }
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
                        <div className="h1 bg-light p-5 border border-dark">Your rank: #{userRank || "—"}</div>
                        <div className="h1 bg-light p-5 border border-dark">Your Score: {userScore}</div>
                    </div>
                    
                </div>
                
            </div>
    
        </main>
    );
}