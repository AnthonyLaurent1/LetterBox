import { useState, useEffect } from 'react'
import './App.css'
import Header from './component/Header'
import MovieCard from './component/MovieCard'
import MovieDetail from './component/MovieDetail'

function App() {
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [view, setView] = useState('saved')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const API_KEY = '7bf49580'

  useEffect(() => {
    fetchSavedMovies()
  }, [])

  const fetchSavedMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies')
      const data = await response.json()
      setSavedMovies(data)
    } catch (error) {
      console.error("Erreur chargement films:", error)
    }
  }

  const searchMovies = async (term, resetGenre = true) => {
    // Ajout du paramètre type=movie pour ne récupérer que des films
    const response = await fetch(`http://www.omdbapi.com/?s=${term}&type=movie&apikey=${API_KEY}`)
    const data = await response.json()
    if (data.Search) {
      // On récupère les détails pour avoir le genre sur les résultats de recherche
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const detailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
          const detailData = await detailResponse.json()
          return detailData.Response === 'True' ? detailData : movie
        })
      )
      setMovies(detailedMovies)
      setView('search')
      if (resetGenre) setSelectedGenre('')
    }
  }

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    const data = await response.json()
    setSelectedMovie(data)
  }

  const handleSaveMovie = async (movieData) => {
    try {
      // Si le film n'a pas de genre (ex: vient de la recherche), on récupère les détails complets
      let dataToSave = movieData
      if (!movieData.Genre && movieData.imdbID) {
        const detailsResponse = await fetch(`http://www.omdbapi.com/?i=${movieData.imdbID}&apikey=${API_KEY}`)
        const detailsData = await detailsResponse.json()
        if (detailsData.Response === 'True') {
          dataToSave = detailsData
        }
      }

      const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      })
      const newMovie = await response.json()
      setSavedMovies([...savedMovies, newMovie])
      alert("Film enregistré !")
    } catch (error) {
      console.error("Erreur sauvegarde:", error)
    }
  }

  const handleUpdateMovie = async (movieData) => {
    try {
      await fetch(`http://localhost:3000/movies/${movieData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      })
      setSavedMovies(savedMovies.map(m => m.id === movieData.id ? movieData : m))
      alert("Film mis à jour !")
    } catch (error) {
      console.error("Erreur mise à jour:", error)
    }
  }

  const handleDeleteMovie = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce film ?")) return
    try {
      await fetch(`http://localhost:3000/movies/${id}`, { method: 'DELETE' })
      setSavedMovies(savedMovies.filter(m => m.id !== id))
    } catch (error) {
      console.error("Erreur suppression:", error)
    }
  }

  const handleRandomMovie = async () => {
    const randomId = Math.floor(Math.random() * 9999999) + 1;
    const imdbId = `tt${randomId.toString().padStart(7, '0')}`;
    
    try {
      // Ajout du paramètre type=movie pour garantir que c'est un film
      const response = await fetch(`http://www.omdbapi.com/?i=${imdbId}&type=movie&apikey=${API_KEY}`);
      const data = await response.json();
      
      if (data.Response === "True" && data.Type === "movie") {
        setSelectedMovie(data);
      } else {
        handleRandomMovie();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération d'un film aléatoire:", error);
    }
  }

  // Fonction pour sauvegarder/mettre à jour depuis MovieDetail
  const handleSaveFromDetail = async (movieData) => {
    // Vérifier si le film existe déjà dans savedMovies
    const existingMovie = savedMovies.find(m => m.imdbID === movieData.imdbID)
    
    if (existingMovie) {
      // Mise à jour
      await handleUpdateMovie({ ...movieData, id: existingMovie.id })
    } else {
      // Nouveau film
      await handleSaveMovie(movieData)
    }
    
    // Rafraîchir la liste
    await fetchSavedMovies()
  }

  // Fonction pour supprimer depuis MovieDetail
  const handleDeleteFromDetail = async (imdbID) => {
    const movieToDelete = savedMovies.find(m => m.imdbID === imdbID)
    if (movieToDelete) {
      await handleDeleteMovie(movieToDelete.id)
      setSelectedMovie(null)
    }
  }

  const getBaseMovies = () => {
    if (view === 'saved') return savedMovies
    
    return movies.map(movie => {
      const saved = savedMovies.find(m => m.imdbID === movie.imdbID)
      return saved ? saved : movie
    })
  }

  const baseMovies = getBaseMovies()
  
  const STATIC_GENRES = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
    "Documentary", "Drama", "Family", "Fantasy", "Film Noir", "History", 
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", 
    "Short", "Sport", "Thriller", "War", "Western"
  ]

  const genres = Array.from(new Set([
    ...STATIC_GENRES,
    ...baseMovies
      .filter(m => m.Genre)
      .flatMap(m => m.Genre.split(', '))
  ])).sort()

  const displayedMovies = selectedGenre
    ? baseMovies.filter(m => m.Genre && m.Genre.includes(selectedGenre))
    : baseMovies

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre)
    if (genre) {
      searchMovies(genre, false)
    } else {
      setView('saved')
    }
  }

  return (
    <div className="app">
      <Header 
        onSearch={searchMovies} 
        onRandomMovie={handleRandomMovie}
        onShowHome={() => {
          setView('saved')
          setSelectedGenre('')
        }}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      
      <h2 className="page-title">{view === 'search' ? 'Résultats de recherche' : 'Mes films enregistrés'}</h2>
      <div className="movies-grid">
        {displayedMovies.map((movie, index) => (
          <MovieCard 
            key={movie.id ? movie.id : `${movie.imdbID}-${index}`}
            movie={movie} 
            onSelect={fetchMovieDetails} 
            onSave={handleSaveMovie}
            onUpdate={handleUpdateMovie}
            onDelete={handleDeleteMovie}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie}
          savedMovies={savedMovies}
          onClose={() => setSelectedMovie(null)}
          onSave={handleSaveFromDetail}
          onDelete={handleDeleteFromDetail}
        />
      )}
    </div>
  )
}

export default App