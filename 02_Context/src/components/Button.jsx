import React, { useContext } from 'react';
import { ThemeContext } from '../hooks/ThemeProvider';

const Button = () => {
  const { changeTheme, darkMode } = useContext(ThemeContext);

  return (
    <button 
      className="theme-button"
      onClick={changeTheme}
    >
      {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default Button;