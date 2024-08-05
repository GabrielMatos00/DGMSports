import React, { useState } from 'react';
import './navbar.css'; // Certifique-se de incluir os estilos necessários
import SearchBar from './SearchBar'; // Importe o componente SearchBar
import  Carrinho from './Carrinho'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);  
return (
  <div className="navbar-container">
  <header className="navbar">
    <div className="left-section">
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <img src="" alt="" className="logo" />
    </div>
        <SearchBar />
        <div className="user-cart">
<button className='cart-button' onClick={() => setIsCarrinhoOpen(true)}>🛒</button>
        {isCarrinhoOpen && <Carrinho isOpen={isCarrinhoOpen} onClose={() => setIsCarrinhoOpen(false)} />}
        </div>
      </header>
      <nav className="nav-links-desktop">
        <ul>
        <Link to="/Brasileirao"><li>Brasileirão</li></Link>
            <Link to="/PremierLeague"> <li>Premier League</li></Link>
            <Link to="/LaLiga"><li>La Liga</li></Link>
            <Link to="/SerieA"><li>Serie A</li></Link>
        </ul>
      </nav>
      {menuOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="close-sidebar" onClick={toggleMenu}>X</button>
          </div>
          <ul>
            <Link to="/Brasileirao"><li>Brasileirão</li></Link>
            <Link to="/PremierLeague"> <li>Premier League</li></Link>
            <Link to="/LaLiga"><li>La Liga</li></Link>
            <Link to="/SerieA"><li>Serie A</li></Link>
          </ul>
          </div>
      )}
    </div>
  );
};

export default Navbar;

