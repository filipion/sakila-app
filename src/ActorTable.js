import React, { useState, useRef } from 'react';
import ActorCard from './ActorCard';
import './Table.css'
import API_ROOT from './api_root';

const ActorTable = (props) => {
  const tableRef = useRef(null)
  const [activeActorId, setActiveActorId] = useState();
  
  const scrollToActor = (id) => {
    const row = document.querySelector(`#table_row_${id}`)
    if (row) {
      row.scrollIntoView()
    }
  }

  return (
    <div className=".ActorTable">
      <div className="navigation_bar">
        <input type="text" placeholder="Enter actor ID" onChange={(e) => setActiveActorId(e.target.value)} onSubmit={() => scrollToActor(activeActorId)}/>
        <button onClick={() => scrollToActor(activeActorId)}>Scroll to Actor</button>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ActorId</th>
            <th>Actions</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Has Starred In</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {props.actors.map(actor => (
            <ActorRow key={actor.ActorId} actor={actor} refreshAll={props.refreshAll} showDelete={props.showDelete}></ActorRow>
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
    const response = await fetch(`${API_ROOT}/actors/${actor.ActorId}`);
    const data = await response.json();
    setActor(data);
  }

  return (
    <tr key={props.actor.ActorId} id={`table_row_${props.actor.ActorId}`}>
      <td>{actor.ActorId}</td>
      <td>
        <ActorCard id={actor.ActorId} FirstName={actor.FirstName} LastName={actor.LastName} refresh={refreshActor} refreshAll={props.refreshAll} showDelete={props.showDelete}/>
      </td>
      <td>{actor.FirstName}</td>
      <td>{actor.LastName}</td>
      <td>{actor.Films.map((film, idx) => <span key={film.FilmId}>{(idx === 0 ? '' : ', ') + film.Title.split(' ').map(pretty).join(' ')}</span>)}</td>
      <td>{actor.LastUpdate}</td>
    </tr>
  )
}

function pretty(title){
  return title[0] + title.slice(1).toLowerCase()
} 

export default ActorTable;