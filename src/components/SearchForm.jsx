const SearchForm = ({onSubmit}) => {
    const submit = (e) => {
        e.preventDefault()
        onSubmit({query: e.target.searchInput.value})
        e.target.reset()
    }
    return(
        <form onSubmit={submit}>
            <input type="text" name="searchInput"/>
            <button type="submit">Search</button>
        </form>
    )

}
export default SearchForm
