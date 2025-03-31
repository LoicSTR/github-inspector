import { useEffect, useState } from "react"
import { githubRequest } from "../../utils"
import './UserDetails.css'

const UserDetails = ({user}) => {
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const colorMap = {
        html: '#E44D26',
        css: '#1572B6',
        javascript: '#C9AD0F',
        php: '#8892BE',
        svelte: '#FF3E00',
        react: '#61DAFB',
        typescript: '#3178C6',
        nodejs: '#339933',
        nextjs: '#000000',
        vue: '#42B883',
        angular: '#DD0031',
        scss: '#CD6799'
      };

      const getColorByText = (text) => {
        return colorMap[text.toLowerCase()] || '#CCCCCC';
      }
    
    useEffect(() => {
        const getDetails = async () => {
            setIsLoading(true)
            const details = await githubRequest(`https://api.github.com/users/${user.login}`)
            const followers = await githubRequest(`https://api.github.com/users/${user.login}/followers`)
            const followings = await githubRequest(`https://api.github.com/users/${user.login}/followings`)
            const reposData = await githubRequest(`https://api.github.com/users/${user.login}/repos?sort=updated&direction=desc`)
            const languagesArray = await Promise.all(
                reposData.map(repo =>
                  githubRequest(`https://api.github.com/repos/${user.login}/${repo.name}/languages`)
                )
            )
            const repositories = reposData.map((repo, index) => ({
            ...repo,
            languages: languagesArray[index]
            }))
            setUserDetails({details, nbFollowers : followers.length, nbFollowings : followings.lentgh, repositories})
            setIsLoading(false)
        }

        if (user) {
            getDetails()
        }
    }, [user])

    if (!user) {
        return null
    }
    if (isLoading || !userDetails) {
        return <p>Ça charge</p>
    }
    const { details, repositories } = userDetails
    
    return (
        <section className="detailsContainer">
            <div className="stickyContainer">
                <img src={details?.avatar_url} alt={details?.login} />
                <h2>{details?.name}</h2>
                <p className="login">{details?.login} {details?.location ? `- ${details.location}` : ''}</p>
                <p className="bio">{details?.bio}</p>
                <div className="followsStats">
                    <p>{details.nbFollowers ?? 0} {details.nbFollowers > 1 ? "followers" : "follower"}</p>
                    <p>{details.nbFollowings ?? 0} {details.nbFollowings > 1 ? "followings" : "following"}</p>
                </div>
            </div>
            <div className="reposContainer">
                <strong>{repositories?.length} {repositories?.length > 1 ? "repositeries" : "repository"}</strong>
                <ul>
                {repositories?.map(repo => (
                    <li key={repo.id} className="repoContent">
                        <a href={repo.html_url} target="_blank">
                            <h4>{repo.name}</h4>
                            <p>{repo?.description}</p>
                            <ul className="languages">
                                {Object.entries(repo.languages).map(language => (
                                    <li key={language[0]} style={{backgroundColor:getColorByText(language[0])}}>{language[0]}</li>
                                ))}
                            </ul>
                        </a>
                    </li>
                ))}

                </ul>
            </div>
        </section>
    )
}
export default UserDetails
