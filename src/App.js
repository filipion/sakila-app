import React, { useState } from 'react';
import ActorTable from './ActorTable';
import ActorForm from './ActorForm'
import ContactForm from './misc'

const App = () => {
  const [activeSection, setActiveSection] = useState('table')
 
  return (
    <div>
      <ul>
        <li onClick={() => setActiveSection('table')}>List of Actors</li>
        <li onClick={() => setActiveSection('form')}>Add Actor</li>
        <li onClick={() => setActiveSection('contact')}>Contact Us</li>
      </ul>
      {activeSection === 'table' && <ActorTable></ActorTable>}
      {activeSection === 'form' && <ActorForm/>}
      {activeSection === 'contact' && <ContactForm/>}
    </div>
  );
};

export default App;
