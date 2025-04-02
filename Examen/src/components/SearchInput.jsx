// src/components/SearchInput.jsx
import React from 'react';
import '../styles/SearchInput.css';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;