import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";

const App = () => {
    const [running, setRunning] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(1500);
    const [mode, setMode] = useState<string>("pomodoro");
    const timerButtonRef = useRef<HTMLButtonElement>(null);
    const pomodoroBtnRef = useRef<HTMLButtonElement>(null);
    const shortBtnRef = useRef<HTMLButtonElement>(null);
    const longBtnRef = useRef<HTMLButtonElement>(null);

    // convert the timer value to minutes and seconds. padStart adds 0 string to ensure 00:00 format
    const minutes = Math.floor(timer / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");

    // run timer button
    const onRunTimer = () => {
        if (!running) {
            setRunning((state) => !state);
        } else {
            setRunning((state) => !state);
        }
        // if statement for timerButtonRef is to make sure the button has loaded in the DOM
        if (timerButtonRef.current) {
            // set the innerText depending on the running state
            timerButtonRef.current.innerText = running ? "Start" : "Pause";
        }
    };

    // pomodoro button
    const onPomodoroBtn = useCallback(() => {
        if (running) {
            if (timerButtonRef.current) {
                timerButtonRef.current.innerText = "Start";
            }
            setRunning((state) => !state);
        }
        setMode("pomodoro");
        setTimer(1500);
    }, [running]);

    // short break button
    const onShortBreakBtn = useCallback(() => {
        if (running) {
            if (timerButtonRef.current) {
                timerButtonRef.current.innerText = "Start";
            }
            setRunning((state) => !state);
        }
        setTimer(300);
        setMode("short");
        // setTimer(2);
    }, [running]);

    // long break button
    const onLongBreakBtn = () => {
        if (running) {
            if (timerButtonRef.current) {
                timerButtonRef.current.innerText = "Start";
            }
            setRunning((state) => !state);
        }
        setMode("long");
        setTimer(900);
    };

    // skip button function. set the timer to 0 and then let the useEffect function below handle the switching of modes. avoids repeating code
    const onSkipBtn = () => {
        setTimer(0);
    };

    // if the timer is running, then run setInterval to decrease the timer value by 1
    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [running]);

    // when the timer reaches 0, we either setup the short break mode or reset back to pomodoro mode
    useEffect(() => {
        if (timer === 0 && mode === "pomodoro") {
            onShortBreakBtn();
        }

        if (
            (timer === 0 && mode === "short") ||
            (timer === 0 && mode === "long")
        ) {
            onPomodoroBtn();
        }
    }, [mode, onPomodoroBtn, onShortBreakBtn, timer]);

    useEffect(() => {
        switch (mode) {
            case "pomodoro":
                if (pomodoroBtnRef.current && shortBtnRef.current) {
                    pomodoroBtnRef.current.style.backgroundColor = "#991b1b";
                    shortBtnRef.current.style.backgroundColor = "transparent";
                }
                break;
            case "short":
                if (shortBtnRef.current && pomodoroBtnRef.current) {
                    pomodoroBtnRef.current.style.backgroundColor =
                        "transparent";
                    shortBtnRef.current.style.backgroundColor = "#065f46";
                }
                break;
            case "long":
                if (longBtnRef.current) {
                    longBtnRef.current.style.backgroundColor = "#075985";
                }
        }
    });

    return (
        <>
            <Header />
            <div className="container">
                <button onClick={onPomodoroBtn} ref={pomodoroBtnRef}>
                    Pomodoro
                </button>
                <button onClick={onShortBreakBtn} ref={shortBtnRef}>
                    Short Break
                </button>
                <button onClick={onLongBreakBtn} ref={longBtnRef}>
                    Long Break
                </button>
                <div>
                    {minutes}:{seconds}
                </div>
                <div>
                    <button onClick={onRunTimer} ref={timerButtonRef}>
                        Start
                    </button>
                    {running && <button onClick={onSkipBtn}>&#9197;</button>}
                </div>
            </div>
        </>
    );
};

export default App;
