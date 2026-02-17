import React from "react";

export function Play() {
    return (
        <main>
            <div className="container-fluid">


                <div className="row mt-4">

                    <div className="col-2 d-none d-xl-block p-3">
                        <h5>Online Users</h5>
                        <ul className="list-unstyled text-nowrap border border-dark p-1">
                            <li className="fs-5">#5 ReverseFlash-50</li>
                            <li className="fs-5">#12 Flash-9</li>
                            <li className="fs-5">#2 chickenFlash-2</li>
                            <li className="fs-5">#9 FunnyDog-1</li>
                            <li className="fs-5">#22 ElloMatey13-11</li>
                            <li className="fs-5">#4 BeforeMeCoug-8</li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-10 col-xl-8 d-flex flex-column align-items-center justify-content-center" style={{height: "50vh"}}>
                        <div className="h3 mb-4 bg-light p-3 border border-dark">Question: How many coins does Mario have to earn before he gets a 1up?</div>
                        <div className="mb-3">Seconds left: 15</div>
                        
                        <div className="d-flex w-100 mb-4">
                            <input type="text" className="form-control me-2 mt-5" placeholder="Answer" />
                            <button className="btn btn-danger mt-5">Skip</button>
                        </div>
                        
                        <div className="w-100 d-flex justify-content-between">
                            <div>Score: 5</div>
                            <button className="btn btn-primary">Submit</button>
                            <div>Skips Left: 2</div>
                        </div>
                    </div>

                    <div className="col-2 d-none d-md-block p-3">
                        <h3>Current User: Duckman4841</h3>
                        <h5>High Score: 23</h5>
                    </div>
                </div>
            </div>
        </main>
    );
}