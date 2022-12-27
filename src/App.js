import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonStats from './PokemonStats';
import PokemonTypeList from "./PokemonTypeList";
import './Pokedex.css';

function Pokedex({ pokemonNumber }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentType, setCurrentType] = useState(pokemon ? pokemon.types[0].type.name : '');


  function handleTypeClick(event) {
      setCurrentType(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        setPokemon(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pokemonNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pokemon) {
    return null;
  }

  if (!pokemon) {
    return null;
  }

    return (
<div className="conteudo">
    <div className="pokedex">
        <div className="pokedex-images">
            <figure className="pokedex-image">
                <img src={pokemon.sprites.front_default} alt={`${pokemon.name} (normal)`} />
                <figcaption>Normal</figcaption>
            </figure>
            <figure className="pokedex-image">
                <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} (shiny)`} />
                <figcaption className="highlight">Shiny</figcaption>
            </figure>
        </div>
        <h1 className={`pokedex-name pokedex-type-${pokemon.types[0].type.name}`}>
            {pokemon.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
        </h1>
        <p className= "pokedex-stat"> Altura: {pokemon.height / 10} m</p>
        <p className= "pokedex-stat"> Peso: {pokemon.weight / 10} kg</p>
        <div className="pokedex-types">
            {pokemon.types.map((type) => (
                <button className={`pokedex-type-button pokedex-type-${type.type.name}`} key={type.type.name} value={type.type.name} onClick={handleTypeClick}>
                    {type.type.name}
                </button>
            ))}
        </div>
        <PokemonStats stats={pokemon.stats} />
    </div>
    <div className= "pokemon-type-list">
        {currentType ? <PokemonTypeList pokemonInfo={pokemon} type={currentType} /> : null}
    </div>
</div>
    );

}

function App() {
  const [pokemonNumber, setPokemonNumber] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setPokemonNumber(event.target.pokemonNumber.value);
  }

  return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h1>Pokedex</h1>
          <label htmlFor="pokemon-number">Insira o nome ou número de um pokemon:</label><br />
          <input type="text" id="pokemonNumber" name="pokemon-number" /><br />
            <button type="submit">Qual é esse pokemon?</button>
        </form>
        {pokemonNumber ? <Pokedex pokemonNumber={pokemonNumber} /> : null}
      </div>
  );
}

export default App;
