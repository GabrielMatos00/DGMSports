import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css'; // Importar arquivo CSS

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [camisas, setCamisas] = useState([]);
  const [filteredCamisas, setFilteredCamisas] = useState([]);

  useEffect(() => {
    // Fetch para buscar os dados do JSON
    fetch('/camisas.json')
      .then(response => response.json())
      .then(data => {
        setCamisas(data);
      });
  }, []);

  useEffect(() => {
    // Filtra os dados com base no termo de pesquisa
    const results = camisas.filter(item =>
      item.time.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCamisas(results);
  }, [searchTerm, camisas]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="camisa-search-container">
      <input
        type="text"
        placeholder="Pesquisar camisas de time..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchTerm && filteredCamisas.length > 0 && (
        <ul className="results-list">
          {filteredCamisas.map(item => (
            <li key={item.id} className="result-item">
              <Link to={item.url}>
                {item.time}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;

