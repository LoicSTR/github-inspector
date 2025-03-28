import "./ItemsList.css";
const ItemsList = ({searchUsers, onClick, isLoading}) => {
 
    if (!searchUsers) {
        return
    }
    if (isLoading) {
        return <p>Ça charge</p>
    }
    const resultText = searchUsers.length ? `${searchUsers.length} ${(searchUsers.length > 1 ? "recherches" : "recherche")}` : "Aucun résultat"
    return (
        <div>
            <p className="result-text">{resultText}</p>
            <ul>
                {searchUsers.map(user => (
                    <li key={user.id} role="button" onClick={() => onClick((user.login))}>
                        <img src={user.avatar_url} alt={user.login} />
                        <p>{user.login}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ItemsList
