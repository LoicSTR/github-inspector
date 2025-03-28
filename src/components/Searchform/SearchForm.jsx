import "./SearchForm.css";

const SearchForm = ({onSubmit}) => {
    const submit = (e) => {
        e.preventDefault()
        onSubmit({query: e.target.searchInput.value})
        e.target.reset()
    }
    return(
        <form onSubmit={submit}>
            <input type="text" name="searchInput" placeholder="Search an user"/>
            <button type="submit" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )

}
export default SearchForm
