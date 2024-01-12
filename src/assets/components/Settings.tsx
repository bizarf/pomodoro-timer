import { useEffect, useRef } from "react";
import "../styles/Settings.css";
import Times from "../types/Times";
import Breaks from "../types/Breaks";
import AutoSettings from "../types/AutoSettings";

type Props = {
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
    times: Times;
    setTimes: React.Dispatch<React.SetStateAction<Times>>;
    breaks: Breaks;
    setBreaks: React.Dispatch<React.SetStateAction<Breaks>>;
    autoSettings: AutoSettings;
    setAutoSettings: React.Dispatch<React.SetStateAction<AutoSettings>>;
};

const Settings = ({
    setSettingsModal,
    times,
    setTimes,
    breaks,
    setBreaks,
    autoSettings,
    setAutoSettings,
}: Props) => {
    const pomodoroTimeSettingRef = useRef<HTMLInputElement>(null);
    const shortTimeSettingRef = useRef<HTMLInputElement>(null);
    const longTimeSettingRef = useRef<HTMLInputElement>(null);
    const longBreakIntervalSettingRef = useRef<HTMLInputElement>(null);
    const autoBreakSettingRef = useRef<HTMLInputElement>(null);
    const autoPomodoroSettingRef = useRef<HTMLInputElement>(null);

    const handleSaveSettings = () => {
        if (
            pomodoroTimeSettingRef.current &&
            shortTimeSettingRef.current &&
            longTimeSettingRef.current &&
            longBreakIntervalSettingRef.current &&
            autoBreakSettingRef.current &&
            autoPomodoroSettingRef.current
        ) {
            // make a copy of the times object and update the values of each property
            setTimes({
                ...times,
                pomodoro:
                    // convert the string to number and then multiply by 60 to change the minutes to seconds
                    parseInt(pomodoroTimeSettingRef.current.value) * 60,
                short: parseInt(shortTimeSettingRef.current.value) * 60,
                long: parseInt(longTimeSettingRef.current.value) * 60,
            });
            // make a copy of the breaks object and update the value of the longBreak property
            setBreaks({
                ...breaks,
                longBreak: parseInt(longBreakIntervalSettingRef.current.value),
            });
            // make a copy of the autoSettings object and update the values of each property
            setAutoSettings({
                ...autoSettings,
                autoBreaks: autoBreakSettingRef.current.checked,
                autoPomodoro: autoPomodoroSettingRef.current.checked,
            });
        }
        setSettingsModal((state) => !state);
        document.body.style.overflow = "visible";
    };

    // on render, change the value of the input boxes to match the current time settings
    useEffect(() => {
        // if the inputs have rendered
        if (
            pomodoroTimeSettingRef.current &&
            shortTimeSettingRef.current &&
            longTimeSettingRef.current &&
            longBreakIntervalSettingRef.current &&
            autoBreakSettingRef.current &&
            autoPomodoroSettingRef.current
        ) {
            // convert the seconds into minutes and then convert that to a string. we then set the input value to the converted string
            pomodoroTimeSettingRef.current.value = (
                times.pomodoro / 60
            ).toString();
            shortTimeSettingRef.current.value = (times.short / 60).toString();
            longTimeSettingRef.current.value = (times.long / 60).toString();
            longBreakIntervalSettingRef.current.value =
                breaks.longBreak.toString();
            autoBreakSettingRef.current.checked = autoSettings.autoBreaks;
            autoPomodoroSettingRef.current.checked = autoSettings.autoPomodoro;
        }
    }, [breaks, times, autoSettings]);

    return (
        <div
            className="settings-modal--background"
            onClick={handleSaveSettings}
        >
            <div
                className="settings-modal--container"
                // prevent the handleSaveSettings function from running whenever the user clicks on anything in this div
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Settings</h2>
                <div className="timeSettings-container">
                    <h3>TIMER</h3>
                    <div>
                        <h4>Time (minutes)</h4>
                        <div
                            className="
                        timerSetting-panel"
                        >
                            <div>
                                <label htmlFor="pomodoroTimeSetting">
                                    Pomodoro
                                </label>
                                <input
                                    type="number"
                                    name="pomodoroTimeSetting"
                                    id="pomodoroTimeSetting"
                                    min={0}
                                    max={60}
                                    ref={pomodoroTimeSettingRef}
                                />
                            </div>

                            <div>
                                <label htmlFor="shortTimeSetting">
                                    Short Break
                                </label>
                                <input
                                    type="number"
                                    name="shortTimeSetting"
                                    id="shortTimeSetting"
                                    min={0}
                                    max={60}
                                    ref={shortTimeSettingRef}
                                />
                            </div>
                            <div>
                                <label htmlFor="longTimeSetting">
                                    Long Break
                                </label>
                                <input
                                    type="number"
                                    name="longTimeSetting"
                                    id="longTimeSetting"
                                    min={0}
                                    max={60}
                                    ref={longTimeSettingRef}
                                />
                            </div>
                        </div>
                        <div className="autoBreaksSetting-container">
                            <label htmlFor="autoStartBreaks">
                                Auto Start Breaks
                            </label>
                            <input
                                type="checkbox"
                                name="autoStartBreaks"
                                id="autoStartBreaks"
                                ref={autoBreakSettingRef}
                            />
                        </div>
                        <div className="autoPomodorosSetting-container">
                            <label htmlFor="autoPomodorosSetting">
                                Auto Start Pomodoros
                            </label>
                            <input
                                type="checkbox"
                                name="autoPomodorosSetting"
                                id="autoPomodorosSetting"
                                ref={autoPomodoroSettingRef}
                            />
                        </div>
                        <div className="longBreakIntervalSetting-container">
                            <label htmlFor="longBreakIntervalSetting-input">
                                Long Break Interval
                            </label>
                            <input
                                type="number"
                                name="longBreakIntervalSetting-input"
                                id="longBreakIntervalSetting-input"
                                min={1}
                                ref={longBreakIntervalSettingRef}
                            />
                        </div>
                    </div>
                </div>
                <div className="settings-modal--bottom">
                    <button onClick={handleSaveSettings} className="saveBtn">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
