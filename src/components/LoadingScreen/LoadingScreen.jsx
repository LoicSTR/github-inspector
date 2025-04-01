import githubLogo from "../../assets/logo-github.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loadingScreen">
      <img src={githubLogo}></img>
    </div>
  );
};

export default LoadingScreen;
