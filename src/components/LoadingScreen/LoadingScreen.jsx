import githubLogo from "../../assets/logo-github.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ color, size }) => {
  const filter =
    color === "white" ? "brightness(0) invert(1)" : "brightness(0)";
  return (
    <div className="loadingScreen">
      <img
        src={githubLogo}
        style={{ width: size, filter: filter }}
        alt="Logo Github"
      ></img>
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
