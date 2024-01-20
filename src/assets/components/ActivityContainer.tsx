type Props = {
    mode: string;
};

const ActivityContainer = ({ mode }: Props) => {
    return (
        <div className="activity-container">
            {mode === "pomodoro" && <span>Study Time!</span>}
            {(mode === "short" || mode === "long") && <span>Break Time!</span>}
        </div>
    );
};

export default ActivityContainer;
