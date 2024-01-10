import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Information from "./assets/components/Information";
import Settings from "./assets/components/Settings";

const App = () => {
    const [running, setRunning] = useState<boolean>(false);
    // timer in seconds
    const [timer, setTimer] = useState<number>(1500);
    const [mode, setMode] = useState<string>("pomodoro");
    // button refs for DOM manipulation
    const timerButtonRef = useRef<HTMLButtonElement>(null);
    const pomodoroBtnRef = useRef<HTMLButtonElement>(null);
    const shortBtnRef = useRef<HTMLButtonElement>(null);
    const longBtnRef = useRef<HTMLButtonElement>(null);
    const timerContainerRef = useRef<HTMLDivElement>(null);
    const appSectionRef = useRef<HTMLDivElement>(null);
    // boolean state for the settings modal
    const [settingsModal, setSettingsModal] = useState<boolean>(false);

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
            timerButtonRef.current.innerText = running ? "START" : "PAUSE";
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
            // if user has accept notifications, send one and after 10 seconds remove it from the notification center
            if (Notification.permission === "granted") {
                const notify = new Notification("Time to take a short break!");
                setTimeout(() => {
                    notify.close();
                }, 10000);
            }
            onShortBreakBtn();
        }

        if (
            (timer === 0 && mode === "short") ||
            (timer === 0 && mode === "long")
        ) {
            // if user has accept notifications, send one and after 10 seconds remove it from the notification center
            if (Notification.permission === "granted") {
                const notify = new Notification("Time to focus!");
                setTimeout(() => {
                    notify.close();
                }, 10000);
            }
            onPomodoroBtn();
        }
    }, [mode, onPomodoroBtn, onShortBreakBtn, timer]);

    // selected button colour swapping feature
    useEffect(() => {
        if (
            pomodoroBtnRef.current &&
            shortBtnRef.current &&
            longBtnRef.current &&
            timerContainerRef.current &&
            appSectionRef.current &&
            timerButtonRef.current
        )
            switch (mode) {
                case "pomodoro":
                    pomodoroBtnRef.current.classList.replace(
                        "non-active-mode",
                        "pomodoroBtn-active"
                    );
                    shortBtnRef.current.classList.replace(
                        "shortBtn-active",
                        "non-active-mode"
                    );
                    longBtnRef.current.classList.replace(
                        "longBtn-active",
                        "non-active-mode"
                    );
                    timerContainerRef.current.style.backgroundColor = "#e11d48";
                    appSectionRef.current.style.backgroundColor = "#be123c";
                    timerButtonRef.current.style.color = "#e11d48";
                    break;
                case "short":
                    pomodoroBtnRef.current.classList.replace(
                        "pomodoroBtn-active",
                        "non-active-mode"
                    );
                    shortBtnRef.current.classList.replace(
                        "non-active-mode",
                        "shortBtn-active"
                    );
                    longBtnRef.current.classList.replace(
                        "longBtn-active",
                        "non-active-mode"
                    );
                    timerContainerRef.current.style.backgroundColor = "#0d9488";
                    appSectionRef.current.style.backgroundColor = "#0f766e";
                    timerButtonRef.current.style.color = "#0d9488";
                    break;
                case "long":
                    pomodoroBtnRef.current.classList.replace(
                        "pomodoroBtn-active",
                        "non-active-mode"
                    );
                    shortBtnRef.current.classList.replace(
                        "shortBtn-active",
                        "non-active-mode"
                    );
                    longBtnRef.current.classList.replace(
                        "non-active-mode",
                        "longBtn-active"
                    );
                    timerContainerRef.current.style.backgroundColor = "#0284c7";
                    appSectionRef.current.style.backgroundColor = "#0369a1";
                    timerButtonRef.current.style.color = "#0284c7";
                    break;
            }
    }, [mode]);

    useEffect(() => {
        // ask for notification permission on page load if user has not already decided
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    return (
        <>
            <div ref={appSectionRef} className="app-section">
                <Header setSettingsModal={setSettingsModal} />
                <div className="container" ref={timerContainerRef}>
                    <div className="mode-controls">
                        <button
                            onClick={onPomodoroBtn}
                            ref={pomodoroBtnRef}
                            className="modeBtns non-active-mode"
                        >
                            Pomodoro
                        </button>
                        <button
                            onClick={onShortBreakBtn}
                            ref={shortBtnRef}
                            className="modeBtns non-active-mode"
                        >
                            Short Break
                        </button>
                        <button
                            onClick={onLongBreakBtn}
                            ref={longBtnRef}
                            className="modeBtns non-active-mode"
                        >
                            Long Break
                        </button>
                    </div>
                    <div className="timer">
                        {minutes}:{seconds}
                    </div>
                    <div className="timer-controls">
                        <div></div>
                        <div>
                            <button
                                onClick={onRunTimer}
                                ref={timerButtonRef}
                                className="startBtn"
                            >
                                START
                            </button>
                        </div>
                        <div className="skipBtn-container">
                            {running && (
                                <button onClick={onSkipBtn} className="skipBtn">
                                    &#9197;
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {settingsModal && (
                    <Settings setSettingsModal={setSettingsModal} />
                )}
            </div>
            <Information />
        </>
    );
};

export default App;
