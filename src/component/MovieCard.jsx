import React from 'react'

const MovieCard = ({ movie, onSelect }) => {
  
  const handleSave = async (e) => {
    e.stopPropagation() // Empêche le clic sur la carte (qui ouvre les détails)
    try {
      await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
      })
      alert(`${movie.Title} a été enregistré !`)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error)
      alert("Erreur : Assurez-vous que json-server tourne sur le port 3000")
    }
  }

  return (
    <div 
      onClick={() => onSelect(movie.imdbID)}
      style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '10px', 
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
      }}
    >
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'} 
        alt={movie.Title} 
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} 
      />
      <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{movie.Title}</h3>
      <p style={{ color: '#666' }}>{movie.Year}</p>
      <button 
        onClick={handleSave}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Enregistrer
      </button>
    </div>
  )
}

export default MovieCard
