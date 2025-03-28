import "./styles/App.css";
import "./styles/reset.css"
import { githubRequest } from "./utils";
import { useState } from "react";
import SearchForm from "./components/Searchform/SearchForm"
import ItemsList from "./components/ItemsList/ItemsList";
import UserDetails from "./components/UserDetails";

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const searchUsers = async (form) => {
    setIsLoading(true)
    const users = await githubRequest(`https://api.github.com/search/users?q=${form.query}`)
    setSearchResults(users.items)
    setCurrentUser('')
    setIsLoading(false)
  }

  const getUserDetails = (user) => {
    setCurrentUser({login: user, timestamp: Date.now()})
  }
  return (
    <main>
      <section className="searchContainer">
        <header>
          <h1>Github Inspector</h1>
          <SearchForm onSubmit={searchUsers}/>
        </header>
          <ItemsList searchUsers={searchResults} onClick={getUserDetails} isLoading={isLoading}/>
      </section>
      <section className="detailsContainer">
        <UserDetails user={currentUser} isLoading={isLoading}/>
      </section>
    </main>
  )
}

export default App
