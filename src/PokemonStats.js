import React from 'react';
import './Pokedex.css';

function PokemonStats({ stats }) {
  return (
    <div className="pokedex-stats-box">
      {stats.map((stat) => (
        <p className="pokedex-stat pokedex-stat-left" key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </p>
      ))}
    </div>
  );
}

export default PokemonStats;
