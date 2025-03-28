const ItemsList = ({searchUsers, onClick}) => {
    if (!searchUsers) {
        return
    }
    if (!searchUsers) {
        return <p>Ça charge</p>
    }
    return (
        <ul>
            {searchUsers.map(user => (
                <li key={user.id}>
                    <img src={user.avatar_url} alt={user.login} />
                    <p>{user.login}</p>
                    <button onClick={() => onClick((user.login))}>Voir</button>
                </li>
            ))}
        </ul>
    )
}
export default ItemsList
