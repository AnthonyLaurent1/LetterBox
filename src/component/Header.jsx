import { useState } from 'react'

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = () => {
    onSearch(searchTerm)
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#2c3e50', color: 'white' }}>
      <h1>LetterBox2</h1>
      <div>
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un film..."
          style={{ padding: '0.5rem', borderRadius: '4px', border: 'none' }}
        />
        <button 
          onClick={handleSubmit}
          style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Rechercher
        </button>
      </div>
    </header>
  )
}
  

export default Header