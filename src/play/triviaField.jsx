import React from "react";

export function TriviaField({loseGame, score, setScore}) {
    const [question, setQuestion] = React.useState("")
    const [answer, setAnswer] = React.useState("")
    const [time, setTime] = React.useState(15)
    const [skips, setSkips] = React.useState(3)
    const [response, setResponse] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const intervalRef = React.useRef(null)
    const gameOverRef = React.useRef(false)
    const scoreRef = React.useRef(score)

    // Keep scoreRef in sync so loseGame always gets the latest score
    React.useEffect(() => {
        scoreRef.current = score
    }, [score])

    React.useEffect(() => {
        getPrompt()
        intervalRef.current = setInterval(() => {
            updateTimer();
        }, 1000)

        // Clear interval when component unmounts to stop the end-of-game polling loop
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    async function getPrompt() {
        try {
            setLoading(true)
            // type=boolean means answers are always "True" or "False" — free-response friendly
            const res = await fetch("https://opentdb.com/api.php?amount=1&type=boolean");
            const data = await res.json();
            const item = data.results[0];

            const parser = new DOMParser();
            const decodedQuestion = parser.parseFromString(item.question, "text/html").body.textContent;

            setQuestion(decodedQuestion);
            setAnswer(item.correct_answer.toLowerCase());
        } catch (e) {
            // If skip is pressed mid-fetch, silently ignore and keep the current question
        } finally {
            setLoading(false)
        }
    }

    function endGame() {
        if (!gameOverRef.current) {
            gameOverRef.current = true
            clearInterval(intervalRef.current)
            loseGame(scoreRef.current)
        }
    }

    function updateTimer() {
        setTime(time => {
            if (time <= 1) {
                endGame()
                return 0
            }
            return time - 1
        })
    }

    function skip() {
        if (skips > 0) {
            setSkips(skips => skips - 1)
            setTime(15)
            getPrompt()
        }
    }

    function submitResponse() {
        if (response.toLowerCase() === answer) {
            setResponse("")
            setScore(score => score + 1)
            setTime(15)
            getPrompt()
        } else {
            endGame()
        }
    }

    return (
        <>
            <div className="h3 mb-4 bg-light p-3 border border-dark">
                {loading ? "Loading question..." : `Question: ${question}`}
            </div>

            <div className="mb-3">Seconds left: {time}</div>

            <div className="d-flex w-100 mb-4">
                <input
                    type="text"
                    className="form-control me-2 mt-5"
                    placeholder={loading ? "Loading..." : "Answer: True or False"}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    disabled={loading}
                />
                <button
                    className="btn btn-danger mt-5"
                    onClick={() => skip()}
                    disabled={loading || skips === 0}
                >Skip</button>
            </div>

            <div className="w-100 d-flex justify-content-between">
                <div>Score: {score}</div>
                <button
                    className="btn btn-primary"
                    onClick={() => submitResponse()}
                    disabled={loading}
                >Submit</button>
                <div>Skips Left: {skips}</div>
            </div>
        </>
    )
}