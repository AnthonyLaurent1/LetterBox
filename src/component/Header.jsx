import { useState } from 'react'

const Header = ({ onSearch, onRandomMovie, onShowHome, genres = [], selectedGenre, onGenreChange }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = () => {
    onSearch(searchTerm)
  }

  return (
    <header className="header">
      <h1 className="logo">LetterBox</h1>
      <nav className="nav-menu">
        <button onClick={onShowHome} className="nav-link">Accueil</button>
        <button onClick={onRandomMovie} className="nav-link">Film aléatoire</button>
      </nav>
      <div className="search-box">
        <select 
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">{genres.length > 0 ? "Tous genres" : "Aucun genre"}</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <input 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un film..."
        />
        <button 
          className="search-btn"
          onClick={handleSubmit}
        >
          Rechercher
        </button>
      </div>
    </header>
  )
}
  

export default Header