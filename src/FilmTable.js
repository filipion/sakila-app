import React, { useState, useRef } from 'react';
import FilmCard from './FilmCard';
import './Table.css'

const FilmTable = (props) => {
  const tableRef = useRef(null)
  const [activeFilmId, setActiveFilmId] = useState();
  
  const scrollToFilm = (id) => {
    const row = document.querySelector(`#table_row_${id}`)
    if (row) {
      row.scrollIntoView()
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
            <th>Title</th>
            <th>Description</th>
            <th>Last Update</th>
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
        <FilmCard id={film.FilmId} Title={film.Title} Description={film.Description} refresh={refreshFilm} refreshAll={props.refreshAll} showDelete={props.showDelete}/>
      </td>
      <td>{film.Title}</td>
      <td>{film.Description}</td>
      <td>{film.LastUpdate}</td>
    </tr>
  )
}

export default FilmTable;