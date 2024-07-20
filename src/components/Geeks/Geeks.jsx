import React, { useState, useEffect } from 'react'
import './Geeks.scss'

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(data => {
        setPokemon(data.results)
        setLoading(false)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='Geeks'>
      <h1>Pokemon List</h1>
      <ul className='pokemon-list'>
        {pokemon.map((poke, index) => (
          <li key={index} className='pokemon-item'>
            <PokemonDetails url={poke.url} name={poke.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const PokemonDetails = ({ url, name }) => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error('Error fetching details:', error))
  }, [url])

  if (!details) {
    return null
  }

  return (
    <div className='pokemon-details'>
      <img src={details.sprites.front_default} alt={details.name} />
      <div className='pokemon-name'>{name}</div>
    </div>
  )
}

export default PokemonList
