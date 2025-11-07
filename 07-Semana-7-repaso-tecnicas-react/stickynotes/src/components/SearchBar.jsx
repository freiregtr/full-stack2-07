import React, { useState } from 'react';

// barra de busqueda en tiempo real
// recibe: onSearch (funcion que se ejecuta al escribir)
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="buscar notas..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
