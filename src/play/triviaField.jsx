import React from "react";

export function TriviaField({ loseGame, score, setScore }) {
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [time, setTime] = React.useState(15);
    const [skips, setSkips] = React.useState(3);
    const [response, setResponse] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const intervalRef = React.useRef(null);
    const gameOverRef = React.useRef(false);
    const scoreRef = React.useRef(score);
    const requestIdRef = React.useRef(0);
    const lastQuestionRef = React.useRef("");

    // Keep scoreRef synced
    React.useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    // Start game loop
    React.useEffect(() => {
        getPrompt();

        intervalRef.current = setInterval(() => {
            updateTimer();
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    async function getPrompt() {
        const requestId = ++requestIdRef.current;

        try {
            setLoading(true);
            setQuestion("");
            setAnswer("");

            const res = await fetch("https://opentdb.com/api.php?amount=1&type=boolean");
            const data = await res.json();

            // Ignore outdated responses
            if (requestId !== requestIdRef.current) return;

            if (!data.results || data.results.length === 0) {
                throw new Error("No questions returned");
            }

            const item = data.results[0];

            const parser = new DOMParser();
            const decodedQuestion = parser
                .parseFromString(item.question, "text/html")
                .body.textContent;

            // Prevent immediate duplicate question
            if (decodedQuestion === lastQuestionRef.current) {
                return getPrompt();
            }
            lastQuestionRef.current = decodedQuestion;

            setQuestion(decodedQuestion);
            setAnswer(item.correct_answer.toLowerCase());
        } catch (e) {
            console.error(e);
            // Retry if still latest request
            if (requestId === requestIdRef.current) {
                getPrompt();
            }
        } finally {
            if (requestId === requestIdRef.current) {
                setLoading(false);
            }
        }
    }

    function endGame() {
        if (!gameOverRef.current) {
            gameOverRef.current = true;
            clearInterval(intervalRef.current);
            loseGame(scoreRef.current);
        }
    }

    function updateTimer() {
        setTime((prev) => {
            if (prev <= 1) {
                endGame();
                return 0;
            }
            return prev - 1;
        });
    }

    function skip() {
        setSkips((prev) => {
            if (prev <= 0) return prev;

            setTime(15);
            setResponse("");
            getPrompt();
            return prev - 1;
        });
    }

    function submitResponse() {
        if (loading) return;

        if (response.toLowerCase().trim() === answer) {
            setResponse("");
            setScore((prev) => prev + 1);
            setTime(15);
            getPrompt();
        } else {
            endGame();
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
                    onClick={skip}
                    disabled={loading || skips === 0}
                >
                    Skip
                </button>
            </div>

            <div className="w-100 d-flex justify-content-between">
                <div>Score: {score}</div>
                <button
                    className="btn btn-primary"
                    onClick={submitResponse}
                    disabled={loading}
                >
                    Submit
                </button>
                <div>Skips Left: {skips}</div>
            </div>
        </>
    );
}