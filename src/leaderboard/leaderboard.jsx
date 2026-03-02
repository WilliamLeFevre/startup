import React from "react";

export function Leaderboard() {
    const [scores, setScores] = React.useState([])

    React.useEffect(() => {
        const scoresText = localStorage.getItem("scores")
        if (scoresText) {
            setScores(JSON.parse(scoresText))
        }
    }, [])

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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ChickenMan</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>TriviaMaster9999</td>
                                    <td>36</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>ZombieKiller</td>
                                    <td>10</td>
                                </tr>
                                <tr><th scope="row">4</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">5</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">6</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">7</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">8</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">9</th><td>&nbsp;</td><td></td></tr>
                                <tr><th scope="row">10</th><td>&nbsp;</td><td></td></tr>
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