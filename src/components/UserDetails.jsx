import { useEffect, useState } from "react"
import { githubRequest } from "../utils"

const UserDetails = ({user}) => {
    const [userDetails, setUserDetails] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const getDetails = async () => {
        setIsLoading(true)
        const details = await githubRequest(`https://api.github.com/users/${user.login}`)
        const reposData = await githubRequest(`https://api.github.com/users/${user.login}/repos`)
        console.log(details)
        setUserDetails({details, repositories : reposData})
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            getDetails()
        }
    }, [user])

    

    if (!user) {
        return
    }
    if (isLoading) {
        return <p>Ça charge</p>
    }
    
    return (
        <div>
            <img src={userDetails.details.avatar_url} alt={userDetails.details.login} />
            <p>{userDetails.details.login}</p>
            <p>{userDetails.details.bio}</p>
            <p>{userDetails.repositories.length} {userDetails.repositories.length > 1 ? "repositeries" : "repository"}</p>
            <ul>
            {userDetails?.repositories.map(repo => (
                <li key={repo.id}>
                    <a href={repo.svn_url} target="_blank">{repo.name}</a>
                </li>
            ))}

            </ul>
        </div>
    )
}
export default UserDetails
