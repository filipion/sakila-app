import React, { useState } from 'react';
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
 
  return (
    <div className="App">
      <ul>
        <li onClick={() => {
          fetchActors()
          setShowForm(false)
          setShowContact(false)
        }}>List of Actors</li>
        <li onClick={() => {
          setShowForm(true)
          setShowContact(false)
        }}>Add Actor</li>
        <li onClick={() => {
          setShowForm(false)
          setShowContact(true)
        }}>Contact Us</li>
      </ul>
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
