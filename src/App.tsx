import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Information from "./assets/components/Information";
import Settings from "./assets/components/Settings";
import Times from "./assets/types/Times";
import Breaks from "./assets/types/Breaks";
import skipIcon from "./assets/svgs/skip-arrow-svgrepo-com.svg";
import AutoSettings from "./assets/types/AutoSettings";
import Footer from "./assets/components/Footer";

const App = () => {
    const [running, setRunning] = useState<boolean>(false);
    // timer in seconds
    const [timer, setTimer] = useState<number>(1500);
    const [mode, setMode] = useState<string>("pomodoro");
    const [times, setTimes] = useState<Times>({
        pomodoro: 1500,
        short: 300,
        long: 900,
    });
    const [breaks, setBreaks] = useState<Breaks>({
        shortBreak: 1,
        longBreak: 4,
    });
    const [autoSettings, setAutoSettings] = useState<AutoSettings>({
        autoBreaks: false,
        autoPomodoro: false,
    });
    // button refs for DOM manipulation
    const timerButtonRef = useRef<HTMLButtonElement>(null);
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
    };

    // pomodoro button
    const onPomodoroBtn = useCallback(() => {
        if (running) {
            setRunning((state) => !state);
        }
        setMode("pomodoro");
        setTimer(times.pomodoro);
    }, [running, times.pomodoro]);

    // short break button
    const onShortBreakBtn = useCallback(() => {
        if (running) {
            setRunning((state) => !state);
        }
        setTimer(times.short);
        setMode("short");
    }, [running, times.short]);

    // long break button
    const onLongBreakBtn = useCallback(() => {
        if (running) {
            setRunning((state) => !state);
        }
        setMode("long");
        setTimer(times.long);
    }, [running, times.long]);

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
                }, 5000);
            }
            // if the short breaks is equal or greater than the long break interval setting, then reset the short breaks to 0 and run the button function that sets the long break times. greater than is in case the user changes the long break setting to a value below the current amount of short breaks.
            console.log(breaks.shortBreak);
            if (breaks.shortBreak >= breaks.longBreak) {
                setBreaks({ ...breaks, shortBreak: 1 });
                // auto run the next timer if the auto breaks setting is on
                if (autoSettings.autoBreaks) {
                    onLongBreakBtn();
                    setRunning((state) => !state);
                } else {
                    onLongBreakBtn();
                }
            } else {
                setBreaks((prevBreaks) => ({
                    ...prevBreaks,
                    shortBreak: prevBreaks.shortBreak + 1,
                }));
                // auto run the next timer if the auto breaks setting is on
                if (autoSettings.autoBreaks) {
                    onShortBreakBtn();
                    setRunning((state) => !state);
                } else {
                    onShortBreakBtn();
                }
            }
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
            // auto run the next timer if the auto pomodoro setting is on
            if (autoSettings.autoPomodoro) {
                onPomodoroBtn();
                setRunning((state) => !state);
            } else {
                onPomodoroBtn();
            }
        }
    }, [
        autoSettings,
        breaks,
        mode,
        onLongBreakBtn,
        onPomodoroBtn,
        onShortBreakBtn,
        timer,
    ]);

    // if the times are changed via the settings modal, then we have to reflect that change on the current mode that the timer is on
    useEffect(() => {
        switch (mode) {
            case "pomodoro":
                setTimer(times.pomodoro);
                break;
            case "short":
                setTimer(times.short);
                break;
            case "long":
                setTimer(times.long);
                break;
        }
    }, [mode, times]);

    // selected button colour swapping feature
    useEffect(() => {
        if (
            timerContainerRef.current &&
            appSectionRef.current &&
            timerButtonRef.current
        )
            switch (mode) {
                case "pomodoro":
                    timerContainerRef.current.style.backgroundColor = "#e11d48";
                    appSectionRef.current.style.backgroundColor = "#be123c";
                    timerButtonRef.current.style.color = "#e11d48";
                    break;
                case "short":
                    timerContainerRef.current.style.backgroundColor = "#0d9488";
                    appSectionRef.current.style.backgroundColor = "#0f766e";
                    timerButtonRef.current.style.color = "#0d9488";
                    break;
                case "long":
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
                <Header setSettingsModal={setSettingsModal} mode={mode} />
                <div className="activity-container">
                    {mode === "pomodoro" && <span>Study Time!</span>}
                    {(mode === "short" || mode === "long") && (
                        <span>Break Time!</span>
                    )}
                </div>
                <div className="app-container" ref={timerContainerRef}>
                    <div className="mode-controls">
                        <button
                            onClick={onPomodoroBtn}
                            className={`modeBtns ${
                                mode === "pomodoro" && "pomodoroBtn-active"
                            } non-active-mode`}
                        >
                            Pomodoro
                        </button>
                        <button
                            onClick={onShortBreakBtn}
                            className={`modeBtns ${
                                mode === "short" && "shortBtn-active"
                            } non-active-mode`}
                        >
                            Short Break
                        </button>
                        <button
                            onClick={onLongBreakBtn}
                            className={`modeBtns ${
                                mode === "long" && "longBtn-active"
                            } non-active-mode`}
                        >
                            Long Break
                        </button>
                    </div>
                    <div className="timer">
                        {minutes}:{seconds}
                    </div>
                    <div className="timer-controls">
                        {/* empty div, as we're going to use grid to make 3 columns with each one having 1fr of space */}
                        <div></div>
                        <div>
                            <button
                                onClick={onRunTimer}
                                ref={timerButtonRef}
                                className="startBtn"
                            >
                                {running ? "PAUSE" : "START"}
                            </button>
                        </div>
                        <div className="skipBtn-container">
                            <button
                                onClick={onSkipBtn}
                                className={`skipBtn ${
                                    running ? "fade-in" : ""
                                }`}
                            >
                                <img src={skipIcon} alt="skip" width={30} />
                            </button>
                        </div>
                    </div>
                </div>
                {settingsModal && (
                    <Settings
                        setSettingsModal={setSettingsModal}
                        times={times}
                        setTimes={setTimes}
                        breaks={breaks}
                        setBreaks={setBreaks}
                        autoSettings={autoSettings}
                        setAutoSettings={setAutoSettings}
                    />
                )}
            </div>
            <Information />
            <Footer />
        </>
    );
};

export default App;
