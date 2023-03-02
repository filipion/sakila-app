import React, { useState } from 'react';
import ActorCard from './ActorCard';

const ActorTable = (props) => {
  return (
    <div>
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
          {props.actors.map(actor => (
            <ActorRow key={actor.ActorId} actor={actor}></ActorRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActorRow = (props) => {
  const [actor, setActor] = useState(props.actor) 

  async function refreshActor() {
    console.log("Fetching 1 actor...")
    const response = await fetch(`/actors/${actor.ActorId}`);
    const data = await response.json();
    setActor(data);
  }

  return (
    <tr key={props.actor.ActorId}>
      <td>{actor.ActorId}</td>
      <td>{actor.FirstName}</td>
      <td>{actor.LastName}</td>
      <td>{actor.LastUpdate}</td>
      <td>
        <ActorCard id={actor.ActorId} FirstName={actor.FirstName} LastName={actor.LastName} refresh={refreshActor}/>
      </td>
    </tr>
  )
}

export default ActorTable;