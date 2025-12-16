import React, { useState, useEffect } from 'react'

const MovieDetail = ({ movie, savedMovies, onClose, onSave, onDelete }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (movie) {
      // Vérifier si le film est déjà sauvegardé
      const savedMovie = savedMovies.find(m => m.imdbID === movie.imdbID)
      if (savedMovie) {
        setRating(savedMovie.rating || 0)
        setComment(savedMovie.comment || '')
      } else {
        setRating(0)
        setComment('')
      }
    }
  }, [movie, savedMovies])

  if (!movie) return null

  const isSaved = savedMovies.some(m => m.imdbID === movie.imdbID)

  const handleSave = () => {
    const movieData = {
      ...movie,
      rating,
      comment
    }
    onSave(movieData)
  }

  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
      onDelete(movie.imdbID)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close"
          onClick={onClose}
        >
          ✖
        </button>

        <img 
          className="modal-poster"
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
          alt={movie.Title}
        />

        <div className="modal-details">
          <h2>{movie.Title}</h2>
          <div className="modal-meta">
            <span>{movie.Year}</span>
            <span>{movie.Genre}</span>
            <span>⭐ {movie.imdbRating}</span>
          </div>
          
          <p className="modal-plot">{movie.Plot}</p>
          
          <p><strong>Réalisateur:</strong> {movie.Director}</p>
          <p><strong>Acteurs:</strong> {movie.Actors}</p>

          {/* Section pour noter et commenter */}
          <div className="rating-section">
            <h3>Ma note</h3>
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

            <h3>Mon commentaire</h3>
            <textarea 
              className="comment-area"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Votre commentaire sur ce film..."
            />

            <div className="card-actions">
              <button 
                className="action-btn btn-save"
                onClick={handleSave}
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
      </div>
    </div>
  )
}

export default MovieDetail