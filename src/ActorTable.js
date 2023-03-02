import React, { useState, useRef } from 'react';
import ActorCard from './ActorCard';

const ActorTable = (props) => {
  const tableRef = useRef(null)
  const [activeActorId, setActiveActorId] = useState();
  
  const scrollToActor = (id) => {
    const row = document.querySelector(`#table_row_${id}`)
    if (row) {
      row.scrollIntoView() // scroll to the row
    }
  }

  return (
    <div>
      <input type="text" placeholder="Enter actor ID" onChange={(e) => setActiveActorId(e.target.value)} onSubmit={() => scrollToActor(activeActorId)}/>
      <button onClick={() => scrollToActor(activeActorId)}>Scroll to Actor</button>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ActorId</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>LastUpdate</th>
            <th>Actions</th>
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
    <tr key={props.actor.ActorId} id={`table_row_${props.actor.ActorId}`}>
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