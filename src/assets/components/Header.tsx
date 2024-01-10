import "../styles/Header.css";

type Props = {
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setSettingsModal }: Props) => {
    return (
        <header>
            <h1>Pomodoro Timer</h1>
            <button onClick={() => setSettingsModal((state) => !state)}>
                &#9881; Setting
            </button>
        </header>
    );
};

export default Header;
