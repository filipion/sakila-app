import React, { useState, useEffect } from 'react';
import ActorTable from './ActorTable';
import FilmTable from './FilmTable';
import ActorForm from './ActorForm'
import ContactForm from './misc'
import './App.css'

const App = () => {
  const [actors, setActors] = useState([]);
  const [films, setFilms] = useState([]);
  const [activeEntity, setActiveEntity] = useState('actors');
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const setItemState = (item, data) => {
    switch(item) {
      case 'actors':
        setActors(data)
        break
      case 'films':
        setFilms(data)
        break
    }
  }

  const fetchEntity = async (item) => {
    console.log(`Fetching ${item}...`)
    const response = await fetch(`/${item}`);
    const data = await response.json();
    setItemState(item, data);
  }

  const refresh = () => {
    fetchEntity('actors')
    fetchEntity('films')
  }

  useEffect(() => {
    refresh();
  }, []);
 
  return (
    <div className="App">

      <button className="post_button" onClick={() => {
          setShowForm(true)
          setShowContact(false)
      }}>+</button>

      <div className="navigation_bar">
        <button onClick={() => {
          fetchEntity('actors')
          setActiveEntity('actors')
          setShowForm(false)
          setShowContact(false)
        }}>Actors</button>
        <button onClick={() => {
          fetchEntity('films')
          setActiveEntity('films')
          setShowForm(false)
          setShowContact(false)
        }}>Films</button>
        <button onClick={() => {
          setShowForm(false)
          showContact ? setShowContact(false) : setShowContact(true)
        }}>Contact Us</button>
        <button className="danger" onClick={() => {
          !showDelete ? setShowDelete(true) : setShowDelete(false)
        }}>{!showDelete ? 'ADMIN' : 'BACK'}</button>
      </div>
        {
          activeEntity === 'actors'
          ? <ActorTable 
              actors={actors} 
              refreshAll={refresh}
              showDelete={showDelete} />
          : <FilmTable 
            films={films} 
            refreshAll={refresh}
            showDelete={showDelete} />
        }
      {showForm && <div className="overlay">
        <ActorForm onClose={() => {
          setShowForm(false)
          refresh()
        }}/>
      </div>}
      {showContact && <div className="overlay"> <ContactForm onClose={() =>  setShowContact(false)}></ContactForm></div>}
    </div>
  );
};

export default App;
