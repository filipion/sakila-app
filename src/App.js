import React, { useState } from 'react';
import ActorTable from './ActorTable';
import ActorForm from './ActorForm'
import ContactForm from './misc'

const App = () => {
  const [activeSection, setActiveSection] = useState('table')
  const [actors, setActors] = useState([]);

  async function fetchActors() {
    console.log("Fetching...")
    const response = await fetch('/actors');
    const data = await response.json();
    setActors(data);
  }
 
  return (
    <div clasName="App">
      <ul>
        <li onClick={() => {
          fetchActors()
          setActiveSection('table')
        }}>List of Actors</li>
        <li onClick={() => setActiveSection('form')}>Add Actor</li>
        <li onClick={() => setActiveSection('contact')}>Contact Us</li>
      </ul>
      {activeSection === 'table' && <ActorTable actors={actors}></ActorTable>}
      {activeSection === 'form' && <ActorForm/>}
      {activeSection === 'contact' && <ContactForm/>}
    </div>
  );
};

export default App;
