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

        async function getPrompt() {
            const response = await fetch("https://opentdb.com/api.php?amount=1");
            const data = await response.json();
            const item = data.results[0];

            
            const parser = new DOMParser();
            const decodedQuestion = parser.parseFromString(item.question, "text/html").body.textContent;

            setQuestion(decodedQuestion);

            
            setAnswer(item.correct_answer.toLowerCase());
        }

        function updateTimer() {
            setTime(time => {
                if (time <= 1) {
                    loseGame()
                    return 0
                }
                return time - 1
            })
        }

        function skip() {
            if (skips > 0) {
                getPrompt()
                setTime(15)
                setSkips(skips => skips - 1)
            }
        }

        function submitResponse() {
            if (response.toLowerCase() === answer) {
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