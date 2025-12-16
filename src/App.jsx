import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import MovieCard from './component/MovieCard'
import MovieDetail from './component/MovieDetail'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const API_KEY = '7bf49580'

  // Recherche la liste des films
  const searchMovies = async (term) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`)
    const data = await response.json()
    if (data.Search) {
      setMovies(data.Search)
    }
  }

  // Récupère les détails complets d'un film
  const fetchMovieDetails = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    const data = await response.json()
    setSelectedMovie(data)
  }

  return (
    <div className="app">
      <Header onSearch={searchMovies} />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onSelect={fetchMovieDetails} 
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  )
}

export default App
