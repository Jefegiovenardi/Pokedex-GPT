import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokedex.css';

function PokemonTypeList({ type }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                setPokemonList(response.data.pokemon);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [type]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <ul>
            {pokemonList.map((pokemon) => {
                return (
                    <li>
                        {pokemon.pokemon.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </li>
                );
            })}
        </ul>
    );

}

export default PokemonTypeList
