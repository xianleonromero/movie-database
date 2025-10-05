import { useState } from 'react'
import './App.css'

function App() {
  // Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  // Tu API Key de OMDb
  const API_KEY = 'e3ffb20e'

  // Buscar películas
  const searchMovies = async () => {
    if (searchTerm.trim() === '') {
      setError('Por favor escribe el nombre de una película')
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.Response === 'True') {
        setMovies(data.Search)
        setError('')
      } else {
        setMovies([])
        setError('No se encontraron películas')
      }
    } catch (err) {
      setError('Error al buscar películas. Intenta de nuevo.')
      console.error(err)
    }

    setLoading(false)
  }

  // Buscar al presionar Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies()
    }
  }

  return (
    <div className="app">
      <h1>Movie Database</h1>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Busca películas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchMovies} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Grid de películas */}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p className="year">{movie.Year}</p>
                <span className="type">{movie.Type}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {searched && movies.length === 0 && !loading && !error && (
        <p className="no-results">No se encontraron películas. Intenta otra búsqueda.</p>
      )}
    </div>
  )
}

export default App