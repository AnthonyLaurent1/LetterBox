import React from 'react'

const MovieDetail = ({ movie, onClose }) => {
  if (!movie) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✖
        </button>

        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
          alt={movie.Title}
          style={{ maxWidth: '300px', width: '100%', objectFit: 'contain' }}
        />

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ marginTop: 0 }}>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Réalisateur:</strong> {movie.Director}</p>
          <p><strong>Acteurs:</strong> {movie.Actors}</p>
          <p><strong>Note IMDB:</strong> {movie.imdbRating}</p>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{movie.Plot}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
