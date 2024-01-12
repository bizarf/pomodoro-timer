import "../styles/Information.css";

const Information = () => {
    return (
        <section className="information-container">
            <div className="pomotime-intro">
                <h2>What is PomoTime?</h2>
                <p>
                    PomoTime is a customisable pomodoro timer inspired by{" "}
                    <a href="https://pomofocus.io/">Pomofocus</a>. This app's
                    goal is to help you focus on a task, such as studying,
                    reading, coding, and so on.
                </p>
            </div>
            <div className="pomodoro-explanation">
                <h2>The Pomodoro Technique</h2>
                <p>
                    Developed by Francesco Cirillo in the late 1980s, the
                    Pomodoro Technique is a time management method. The
                    technique uses a timer to break work into intervals,
                    typically 25 minutes, separated by short breaks. Each
                    interval is known as a pomodoro, which is Italian for
                    tomato, and was named after the tomato-shaped kitchen timer
                    that Cirillo used as a university student.
                </p>
            </div>
        </section>
    );
};

export default Information;
