import React, { useState, useEffect } from 'react';
import ActorTable from './ActorTable';
import ActorForm from './ActorForm'
import ContactForm from './misc'
import './App.css'

const App = () => {
  const [actors, setActors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);

  async function fetchActors() {
    console.log("Fetching...")
    const response = await fetch('/actors');
    const data = await response.json();
    setActors(data);
  }

  useEffect(() => {
    fetchActors();
  }, []);
 
  return (
    <div className="App">
      <div className="navigation_bar">
        <button onClick={() => {
          fetchActors()
          setShowForm(false)
          setShowContact(false)
        }}>Actors</button>
        <button onClick={() => {
          setShowForm(true)
          setShowContact(false)
        }}>Add Actor</button>
        <button onClick={() => {
          setShowForm(false)
          setShowContact(true)
        }}>Contact Us</button>
      </div>
      <ActorTable actors={actors} refreshAll={fetchActors}></ActorTable>
      {showForm && <div className="overlay">
        <ActorForm onClose={() => {
          setShowForm(false)
          fetchActors()
        }}
        />
      </div>}
      {showContact && <div className="overlay">
        <ContactForm onClose={() =>  setShowContact(false)}></ContactForm>
      </div>}
    </div>
  );
};

export default App;
