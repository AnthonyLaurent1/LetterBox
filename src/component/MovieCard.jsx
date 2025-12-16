import { useState, useEffect } from 'react'

const MovieCard = ({ movie, onSelect, onSave, onUpdate, onDelete }) => {
  const [rating, setRating] = useState(movie.rating || 0)
  const [comment, setComment] = useState(movie.comment || '')
  
  useEffect(() => {
    setRating(movie.rating || 0)
    setComment(movie.comment || '')
  }, [movie])
  
  // Si le film a un ID, c'est qu'il vient de notre base de données (json-server)
  const isSaved = movie.id !== undefined

  const handleAction = (e) => {
    e.stopPropagation() // Empêche le clic sur la carte (qui ouvre les détails)
    const movieData = { ...movie, rating, comment }
    
    if (isSaved) {
      onUpdate(movieData)
    } else {
      onSave(movieData)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(movie.id)
  }

  return (
    <div 
      className="movie-card"
      onClick={() => onSelect(movie.imdbID)}
    >
      <img 
        className="movie-poster"
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'} 
        alt={movie.Title} 
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      
        <div className="rating-stars" onClick={(e) => e.stopPropagation()}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              onClick={() => setRating(star)}
              className={`star ${star <= rating ? 'active' : ''}`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea 
          className="comment-area"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Votre commentaire..."
        />

        <div className="card-actions">
          <button 
            className="action-btn btn-save"
            onClick={handleAction}
          >
            {isSaved ? 'Mettre à jour' : 'Enregistrer'}
          </button>

          {isSaved && (
            <button 
              className="action-btn btn-delete"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
