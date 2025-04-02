import React from 'react';
import Button from './components/Button';
import './index.css';

const App = ({ darkMode }) => {
  return (
    <div className="app-container">
      <h1>{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</h1>
      <Button />
    </div>
  );
};

export default App;