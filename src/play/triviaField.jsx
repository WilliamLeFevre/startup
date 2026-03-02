    import React from "react";

    export function TriviaField({loseGame, score, setScore}) {
        const [question, setQuestion] = React.useState("")
        const [answer, setAnswer] = React.useState("")
        const [time, setTime] = React.useState(15)
        const [skips, setSkips] = React.useState(3)
        const [response, setResponse] = React.useState("")
    

        React.useEffect(() => {
            getPrompt()
            setInterval(() => {
                updateTimer();
            }, 1000)
        }, [])

        function getPrompt() {
            let randomNum = Math.floor(Math.random() * 5) + 1
            setQuestion("How many coins does it take for Mario to earn " + randomNum + " 1ups")
            setAnswer(String(100 * randomNum))
        }

        function updateTimer() {
            setTime(time => time - 1)
        }

        function skip() {
            if (skips > 0) {
                getPrompt()
                setTime(15)
                setSkips(skips => skips - 1)
            }
        }

        function submitResponse() {
            if (response === answer) {
                setResponse("")
                setScore(score => score + 1)
                getPrompt()
                setTime(15)
            } else {
                loseGame()
            }
        }

        return (
            <>
                <div className="h3 mb-4 bg-light p-3 border border-dark">
                    Question: {question}
                </div>

                <div className="mb-3">Seconds left: {time}</div>
                    
                <div className="d-flex w-100 mb-4">
                    <input type="text" className="form-control me-2 mt-5" placeholder="Answer" 
                    value={response} onChange={(e) => setResponse(e.target.value)} />
                    <button className="btn btn-danger mt-5" onClick={() => skip()}>Skip</button>
                </div>
                
                <div className="w-100 d-flex justify-content-between">
                    <div>Score: {score}</div>
                    <button className="btn btn-primary" onClick={() => submitResponse()}>Submit</button>
                    <div>Skips Left: {skips}</div>
                </div>
            </>
        )
    }