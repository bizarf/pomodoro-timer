import { useEffect, useRef } from "react";
import "../styles/Settings.css";
import Times from "../types/Times";
import Breaks from "../types/Breaks";

type Props = {
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
    times: Times;
    setTimes: React.Dispatch<React.SetStateAction<Times>>;
    breaks: Breaks;
    setBreaks: React.Dispatch<React.SetStateAction<Breaks>>;
};

const Settings = ({
    setSettingsModal,
    times,
    setTimes,
    breaks,
    setBreaks,
}: Props) => {
    const pomodoroTimeSettingRef = useRef<HTMLInputElement>(null);
    const shortTimeSettingRef = useRef<HTMLInputElement>(null);
    const longTimeSettingRef = useRef<HTMLInputElement>(null);
    const longBreakIntervalSettingRef = useRef<HTMLInputElement>(null);

    const handleSaveSettings = () => {
        if (
            pomodoroTimeSettingRef.current &&
            shortTimeSettingRef.current &&
            longTimeSettingRef.current &&
            longBreakIntervalSettingRef.current
        ) {
            // if the pomodoro time setting is changed, then update the pomodoro time in the times object
            if (
                // the times are save in seconds and as numbers, so have to convert to string to compare the input value as that is a string
                (times.pomodoro / 60).toString() !=
                pomodoroTimeSettingRef.current.value
            ) {
                setTimes({
                    ...times,
                    pomodoro:
                        // convert the string to number and then multiply by 60 to change the minutes to seconds
                        parseInt(pomodoroTimeSettingRef.current.value) * 60,
                });
            }
            // if the short break time setting is changed, then update the short break time in the times object
            if (
                (times.short / 60).toString() !=
                shortTimeSettingRef.current.value
            ) {
                setTimes({
                    ...times,
                    short: parseInt(shortTimeSettingRef.current.value) * 60,
                });
            }
            // if the long break time setting is changed, then update the long break time in the times object
            if (
                (times.long / 60).toString() != longTimeSettingRef.current.value
            ) {
                setTimes({
                    ...times,
                    long: parseInt(longTimeSettingRef.current.value) * 60,
                });
            }
            // update the long break interval setting if the setting is changed
            if (
                breaks.longBreak.toString() !=
                longBreakIntervalSettingRef.current.value
            ) {
                setBreaks({
                    ...breaks,
                    longBreak: parseInt(
                        longBreakIntervalSettingRef.current.value
                    ),
                });
            }
        }
        setSettingsModal((state) => !state);
    };

    // on render, change the value of the input boxes to match the current time settings
    useEffect(() => {
        // if the inputs have rendered
        if (
            pomodoroTimeSettingRef.current &&
            shortTimeSettingRef.current &&
            longTimeSettingRef.current &&
            longBreakIntervalSettingRef.current
        ) {
            // convert the seconds into minutes and then convert that to a string. we then set the input value to the converted string
            pomodoroTimeSettingRef.current.value = (
                times.pomodoro / 60
            ).toString();
            shortTimeSettingRef.current.value = (times.short / 60).toString();
            longTimeSettingRef.current.value = (times.long / 60).toString();
            longBreakIntervalSettingRef.current.value =
                breaks.longBreak.toString();
        }
    }, [breaks, times]);

    return (
        <div
            className="settings-modal--background"
            onClick={handleSaveSettings}
        >
            <div
                className="settings-modal--container"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Settings</h2>
                <div className="timeSettings-container">
                    <div className="timerHeader">
                        <h3>TIMER</h3>
                    </div>
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
