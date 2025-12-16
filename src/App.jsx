import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async () => {
    // Remplacez 'YOUR_API_KEY' par votre clé API obtenue sur http://www.omdbapi.com/apikey.aspx
    const API_KEY = '7bf49580'
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
    const data = await response.json()

    if (data.Search) {
      setMovies(data.Search)
    }
  }

  return (
    <div className="app">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#2c3e50', color: 'white' }}>
        <h1>LetterBox</h1>
        <div>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un film..."
            style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
          />
          <button 
            onClick={searchMovies}
            style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Rechercher
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'} 
              alt={movie.Title} 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
