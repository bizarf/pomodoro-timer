import githubIcon from "../svgs/github-mark.svg";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer>
            <span>Created by</span>
            <a href="https://github.com/bizarf">
                Tony Hoong{" "}
                <img src={githubIcon} alt="Tony's Github" width={20} />
            </a>
            <span>2024</span>
        </footer>
    );
};

export default Footer;
