import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {Login} from "./login/login";
import {Play} from "./play/play";
import {Leaderboard} from "./leaderboard/leaderboard";
import {About} from "./about/about";
import { AuthState } from "./login/authState";

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem("userName") || "");
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div>
                <header>
                    <div className="container-fluid bg-light">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-4 d-none d-sm-block">
                                <h1 className="display-3 text-center">Trivia Survival</h1>
                            </div>
                            <div className="col-8">
                                <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <NavLink className="nav-link border border-primary" to="">Home</NavLink>
                                    </li>
                                    {authState === AuthState.Authenticated && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link border border-primary" to="play">Play</NavLink>
                                    </li>
                                    )}
                                    {authState === AuthState.Authenticated && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link border border-primary" to="leaderboard">Leaderboard</NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <NavLink className="nav-link border border-primary" to="about">About</NavLink>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    
                </header>

                <Routes>
                    <Route path="/" element=
                    {<Login authState={authState} userName={userName} onAuthChange={
                        (userName, authState) => {
                            setAuthState(authState)
                            setUserName(userName)
                        }
                    }/>} exact />
                    <Route path="/play" element={<Play />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>

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

            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unkown.</main>
}