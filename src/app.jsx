import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
    return (
        
        <body>
            <header>
                <div className="container-fluid bg-light">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-4 d-none d-sm-block">
                            <h1 className="display-3 text-center">Trivia Survival</h1>
                        </div>
                        <div className="col-8">
                            <ul className="nav nav-pills nav-fill">
                                <li className="nav-item">
                                    <a className="nav-link active" href="index.html">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link border border-primary" href="play.html">Play</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link border border-primary" href="leaderboard.html">Leaderboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link border border-primary" href="about.html">About</a>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                
            </header>

            <main>App components go here!</main>

            <footer>
                <div className="container-fluid fixed-bottom bg-secondary text-white">
                    <div className="row">
                        <div className="col">
                            <strong className="text-nowrap">
                                Created by William LeFevre
                            </strong>
                        </div>
                        <div className="col text-end">
                            <a className="btn btn-primary btn-sm" href="https://github.com/WilliamLeFevre/startup">Source Code</a>
                        </div>
                    </div>
                    
                        
                        
                    
                </div>
            </footer>
            
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

        </body>

    )
}