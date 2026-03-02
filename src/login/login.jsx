import React from "react";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";
import { Authenticated } from "./authenticated";

export function Login({userName, authState, onAuthChange}) {
    return (
        <main>
            <div className="container-lg" style={{height: "70vh"}}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        {authState !== AuthState.Unknown && (
                            <h1 className="display-4 mb-3">Welcome to Trivia Survival!</h1>
                        )}
                        {authState === AuthState.Authenticated && (
                            <Authenticated onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}/>
                        )}
                        {authState === AuthState.Unauthenticated && (
                            <Unauthenticated userName={userName} onLogin={(loginUserName => {
                                onAuthChange(loginUserName, AuthState.Authenticated)
                            })} />
                        )}
                    </div>
                        
    
                </div>
                
            </div>
        </main>
    );
}