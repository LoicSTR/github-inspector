import { useEffect, useState } from "react"
import { githubRequest } from "../utils"

const UserDetails = ({user}) => {

    const [details, setDetails] = useState()

    const getDetails = async () => {
        const detailsData = await githubRequest(`https://api.github.com/users/${user}`)
        const reposData = await githubRequest(`https://api.github.com/users/${user}/repos`)
        setDetails({detailsData, repositories : reposData})
    }

    useEffect(() => {
        if (user) {
            getDetails()
        }
    }, [user])

    

    if (!user) {
        return
    }
    if (!details) {
        return <p>Ça charge</p>
    }
    
    return (
        <div>
            <img src={details.detailsData.avatar_url} alt={details.detailsData.login} />
            <p>{details.detailsData.login}</p>
            <p>{details.detailsData.bio}</p>
            <ul>
            {details.repositories.map(repo => (
                <li key={repo.id}>
                    <a href={repo.svn_url} target="_blank">{repo.name}</a>
                </li>
            ))}

            </ul>
        </div>
    )
}
export default UserDetails
