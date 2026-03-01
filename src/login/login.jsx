import React from "react";

export function Login() {
    return (
        <main>
            <div className="container-lg" style={{height: "70vh"}}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        <h1 className="display-4 mb-3">Welcome to Trivia Survival!</h1>
                        <form method="get" className="w-50 mx-auto">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control mb-4"placeholder="Enter username" />
                            </div>
                            <div className="form-group mb-4">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary me-2">Login</button>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                        
    
                </div>
                
            </div>
        </main>
    );
}