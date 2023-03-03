import React, { useState, useRef } from 'react';
import FilmCard from './FilmCard';
import './Table.css'

const FilmTable = (props) => {
  const tableRef = useRef(null)
  const [activeFilmId, setActiveFilmId] = useState();
  
  const scrollToFilm = (id) => {
    const row = document.querySelector(`#table_row_${id}`)
    if (row) {
      row.scrollIntoView() // scroll to the row
    }
  }

  return (
    <div className=".FilmTable">
      <div className="navigation_bar">
        <input type="text" placeholder="Enter film ID" onChange={(e) => setActiveFilmId(e.target.value)} onSubmit={() => scrollToFilm(activeFilmId)}/>
        <button onClick={() => scrollToFilm(activeFilmId)}>Scroll to Film</button>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>FilmId</th>
            <th>Actions</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Last Update</th>
            <th>Has Starred In</th>
          </tr>
        </thead>
        <tbody>
          {props.films.map(film => (
            <FilmRow key={film.FilmId} film={film} refreshAll={props.refreshAll} showDelete={props.showDelete}></FilmRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FilmRow = (props) => {
  const [film, setFilm] = useState(props.film) 

  async function refreshFilm() {
    console.log("Fetching 1 film...")
    const response = await fetch(`/films/${film.FilmId}`);
    const data = await response.json();
    setFilm(data);
  }

  return (
    <tr key={props.film.FilmId} id={`table_row_${props.film.FilmId}`}>
      <td>{film.FilmId}</td>
      <td>
        <FilmCard id={film.FilmId} FirstName={film.FirstName} LastName={film.LastName} refresh={refreshFilm} refreshAll={props.refreshAll} showDelete={props.showDelete}/>
      </td>
      <td>{film.FirstName}</td>
      <td>{film.LastName}</td>
      <td>{film.LastUpdate}</td>
      <td>{film.Films.map((film, idx) => <span key={film.FilmId}>{(idx === 0 ? '' : ', ') + film.Title.split(' ').map(pretty).join(' ')}</span>)}</td>
    </tr>
  )
}

function pretty(title){
  return title[0] + title.slice(1).toLowerCase()
} 

export default FilmTable;