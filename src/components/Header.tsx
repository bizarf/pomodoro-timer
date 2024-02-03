import { useEffect, useRef } from "react";
import "../styles/Header.css";
import gearIcon from "../assets/svgs/gear-svgrepo-com.svg";

type Props = {
    setSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
    mode: string;
};

const Header = ({ setSettingsModal, mode }: Props) => {
    const settingsBtnRef = useRef<HTMLButtonElement>(null);

    const handleOpenSettingsModal = () => {
        setSettingsModal((state) => !state);
        document.body.style.overflow = "hidden";
    };

    useEffect(() => {
        if (settingsBtnRef.current) {
            if (mode === "pomodoro") {
                settingsBtnRef.current.style.backgroundColor = "#e11d48";
            } else if (mode === "short") {
                settingsBtnRef.current.style.backgroundColor = "#0d9488";
            } else {
                settingsBtnRef.current.style.backgroundColor = "#0284c7";
            }
        }
    }, [mode]);

    return (
        <header>
            <h1>PomoTimer</h1>
            <button
                onClick={handleOpenSettingsModal}
                ref={settingsBtnRef}
                className="settingsBtn"
            >
                <img src={gearIcon} alt="settings" width={18} />
                <span>Setting</span>
            </button>
        </header>
    );
};

export default Header;
