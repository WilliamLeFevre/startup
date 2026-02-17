import React from "react";

export function About() {
    return (
        <main>
            <div className="container-md" style={{height: "70vh"}}>
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-12 text-center">
                        <img id="logo-image" className="img-fluid mb-3" src="logo_placeholder.png" />
                        <p className="fs-5 border border-primary p-3 bg-light lead">
                        Trivia Survival is a game for answering questions and building a high score, and seeing how you compare with other users. You are continuously fed trivia questions, 
                        one after another, and as soon as you miss one, your game ends and you are placed on the leaderboard according to your score. 
                        To help you score high, you are equipped with 3 skips, that lets you avoid answering a question you 
                        don't know. Make sure you answer quickly, because each question has you on a time limit, and if you don't
                        answer in time, you lose!
                        </p>
                    </div>
                    
                </div>
                
            </div>
            
        </main>
    );
}