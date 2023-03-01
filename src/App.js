import React, { useState } from 'react';
import ActorTable from './ActorTable';
import ActorForm from './ActorForm'
import ContactForm from './misc'

const App = () => {
  const [activeSection, setActiveSection] = useState('table')
  const handleSectionClick = section => {
    setActiveSection(section)
  }

  return (
    <div>
      <ul>
        <li onClick={() => handleSectionClick('table')}>List of Actors</li>
        <li onClick={() => handleSectionClick('form')}>Add Actor</li>
        <li onClick={() => handleSectionClick('contact')}>Contact Us</li>
      </ul>
      {activeSection === 'table' && <ActorTable></ActorTable>}
      {activeSection === 'form' && <ActorForm/>}
      {activeSection === 'contact' && <ContactForm/>}
    </div>
  );
};

export default App;
