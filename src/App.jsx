import "./App.css";
import { githubRequest } from "./utils";
import { useState } from "react";
import SearchForm from "./components/searchForm"
import ItemsList from "./components/ItemsList";
import UserDetails from "./components/UserDetails";
// import { useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [searchResults, setSearchResults] = useState('')

  const searchUsers = async (form) => {
    const users = await githubRequest(`https://api.github.com/search/users?q=${form.query}`)
    setSearchResults(users.items)
    setCurrentUser('')
  }

  // useEffect(() => {
  //   console.log(searchResults)
  // }, [searchResults])

  return (
    <section className="main">
      <div>
        <h1>Github Inspector</h1>
        <SearchForm onSubmit={searchUsers}/>
        <p>{searchResults.length ? `${searchResults.length} recherches` : "Aucun résultat"} </p>
        <ItemsList searchUsers={searchResults} onClick={setCurrentUser}/>
      </div>
      <UserDetails user={currentUser} />
    </section>
  )
}

export default App
