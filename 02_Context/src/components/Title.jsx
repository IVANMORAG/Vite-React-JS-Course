import React, { useContext } from 'react';
import { ThemeContext } from '../hooks/ThemeProvider';

const Title = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <h1 style={{ 
      color: darkMode ? '#fff' : '#000', 
      transition: 'color 0.3s'
    }}>
      {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
    </h1>
  );
};

export default Title;
