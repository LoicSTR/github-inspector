import "./ItemsList.css"

const ItemsList = ({searchUsers, onClick, isLoading}) => {

    if (!searchUsers) {
        return
    }
    if (isLoading) {
        return <p>Ça charge</p>
    }

    return (
        <ul className="searchItemsList">
            {searchUsers.map(user => (
                <li key={user.id} role="button" onClick={() => onClick((user.login))}>
                    <img src={user.avatar_url} alt={user.login} />
                    <p>{user.login}</p>
                </li>
            ))}
        </ul>
    )
}
export default ItemsList
