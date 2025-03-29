import { useEffect, useState } from "react"
import { githubRequest } from "../../utils"
import './UserDetails.css'

const UserDetails = ({user}) => {
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const getDetails = async () => {
            setIsLoading(true)
            const details = await githubRequest(`https://api.github.com/users/${user.login}`)
            const reposData = await githubRequest(`https://api.github.com/users/${user.login}/repos`)
            const languagesArray = await Promise.all(
                reposData.map(repo =>
                  githubRequest(`https://api.github.com/repos/${user.login}/${repo.name}/languages`)
                )
              )
              const repositories = reposData.map((repo, index) => ({
                ...repo,
                languages: languagesArray[index]
              }))
            setUserDetails({details : details, repositories})
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
            <img src={details?.avatar_url} alt={details?.login} />
            <div>
                <div className="top">
                    <h2>{details?.name}</h2>
                    <p className="login">{details?.login} {details?.location ? `- ${details.location}` : ''}</p>
                    <p className="bio">{details?.bio}</p>
                </div>
                <strong>{repositories?.length} {repositories?.length > 1 ? "repositeries" : "repository"}</strong>
                <ul>
                {repositories?.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank">
                            <p>{repo.name}</p>
                            <p>{repo?.description}</p>
                            <ul>
                                {Object.entries(repo.languages).map(([language, size]) => (
                                    <li key={language}>{language}</li>
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
