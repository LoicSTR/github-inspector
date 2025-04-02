import { useEffect, useState } from "react";
import { githubRequest } from "../../utils";
import languageColors from "../../utils/languageColors";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./UserDetails.css";

const UserDetails = ({ user, onClose }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getColorByText = (text) => {
    return languageColors[text.toLowerCase()] || "#CCCCCC";
  };

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      const details = await githubRequest(
        `https://api.github.com/users/${user.login}`
      );
      const reposData = await githubRequest(
        `https://api.github.com/users/${user.login}/repos?sort=updated&direction=desc`
      );
      const languagesArray = await Promise.all(
        reposData.map((repo) =>
          githubRequest(
            `https://api.github.com/repos/${user.login}/${repo.name}/languages`
          )
        )
      );
      const repositories = reposData.map((repo, index) => ({
        ...repo,
        languages: languagesArray[index],
      }));
      setUserDetails({
        details,
        repositories,
      });
      setIsLoading(false);
    };

    if (user) {
      getDetails();
    }
  }, [user]);

  if (!user) {
    return <section className="detailsContainer"></section>;
  }
  if (isLoading || !userDetails) {
    return (
      <section className="detailsContainer active">
        <LoadingScreen color="black" size="10rem" />
      </section>
    );
  }

  const { details, repositories } = userDetails;

  return (
    <section className="detailsContainer active">
      <button className="closeButton" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="stickyContainer">
        <img src={details?.avatar_url} alt={details?.login} />
        <a href={details?.url}>
          <h2>{details?.name}</h2>
        </a>
        <div className="followsStats">
          <p>
            {details?.followers}{" "}
            {details?.followers > 1 ? "followers" : "follower"}
          </p>
          <p>•</p>
          <p>
            {details?.following}{" "}
            {details?.following > 1 ? "followings" : "following"}
          </p>
        </div>
        <p className="bio">{details?.bio}</p>
      </div>
      <div className="reposContainer">
        <strong>
          {repositories?.length}{" "}
          {repositories?.length > 1 ? "repositeries" : "repository"}
        </strong>
        <ul className="reposList">
          {repositories?.map((repo) => (
            <li key={repo.id} className="repoContent">
              <a href={repo.html_url} target="_blank">
                <h4>{repo.name}</h4>
                <p>{repo?.description}</p>
                <ul className="languages">
                  {Object.entries(repo.languages).map((language) => (
                    <li
                      key={language[0]}
                      style={{ backgroundColor: getColorByText(language[0]) }}
                    >
                      {language[0]}
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default UserDetails;
