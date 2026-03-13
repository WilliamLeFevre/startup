import React from "react";

export function Leaderboard({userName}) {
    const [scores, setScores] = React.useState([])
    const [userScore, setUserScore] = React.useState(0)
    const [userRank, setUserRank] = React.useState(0)

    React.useEffect(() => {
        fetch("/api/scores")
            .then((response) => response.json())
            .then((scores) => {
                setScores(scores)
            });
    }, []);

    const scoreRows = []
    let displayed = []
    let rank = 1
    if (scores.length) {
        for (let i = 0; i < 10; i++) {
            if (scores[i]) {
                if (displayed.includes(scores[i].name) === false) {
                    scoreRows.push(
                        <tr>
                            <th scope="row">{rank++}</th>
                            <td>{scores[i].name}</td>
                            <td>{scores[i].score}</td>
                        </tr>
                    )
                    displayed.push(scores[i].name)
                }
            } else {
                scoreRows.push(
                    <tr>
                        <th scope="row">{rank++}</th>
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
                        <div className="h1 bg-light p-5 border border-dark">Your rank: #{userRank}</div>
                        <div className="h1 bg-light p-5 border border-dark">Your Score: {userScore}</div>
                    </div>
                    
                </div>
                
            </div>
    
        </main>
    );
}