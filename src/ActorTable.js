import React, { useState, useEffect } from 'react';
import ActorCard from './ActorCard';

const ActorTable = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function fetchActors() {
      const response = await fetch('/actors');
      const data = await response.json();
      setActors(data);
    }

    fetchActors();
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ActorId</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>LastUpdate</th>
          <th>ActorCard</th>
        </tr>
      </thead>
      <tbody>
        {actors.map(actor => (
          <tr key={actor.ActorId}>
            <td>{actor.ActorId}</td>
            <td>{actor.FirstName}</td>
            <td>{actor.LastName}</td>
            <td>{actor.LastUpdate}</td>
            <ActorCard FirstName={actor.FirstName} LastName={actor.LastName}></ActorCard>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActorTable;