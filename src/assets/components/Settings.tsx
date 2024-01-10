import "../styles/Settings.css";

type Props = {
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Settings = ({ setSettingsModal }: Props) => {
    const handleCloseSettings = () => {
        setSettingsModal((state) => !state);
    };

    return (
        <div
            className="settings-modal--background"
            onClick={handleCloseSettings}
        >
            <div
                className="settings-modal--container"
                onClick={(e) => e.stopPropagation()}
            >
                Settings go here
            </div>
        </div>
    );
};

export default Settings;
