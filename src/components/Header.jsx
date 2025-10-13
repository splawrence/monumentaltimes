import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import mtLogo from '../assets/mt-logo.png';

const Header = ({ onAboutClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header nyt">
      <div className="header-top">
        <div className="header-container">
          <div className="header-date">{currentDate}</div>
          <div className="header-actions">
            <button className="subscribe-btn">Subscribe</button>
            <button className="login-btn">Log In</button>
          </div>
        </div>
      </div>
      
      <div className="header-main">
        <div className="header-container">
          <button 
            className="hamburger-menu" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className="logo">
            <img src={mtLogo} alt="Monumental Times" className="logo-image" />
          </div>
          
          <div className="search-container">
            <button className="search-btn">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <div className="nav-container">
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#politics" className="nav-link">Politics</a>
            <a href="#world" className="nav-link">World</a>
            <a href="#business" className="nav-link">Business</a>
            <a href="#technology" className="nav-link">Technology</a>
            <a href="#opinion" className="nav-link">Opinion</a>
            <a href="#sports" className="nav-link">Sports</a>
            <a href="#arts" className="nav-link">Arts</a>
            <a href="#lifestyle" className="nav-link">Lifestyle</a>
            <button 
              onClick={onAboutClick} 
              className="nav-link nav-link--button"
            >
              About Us
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  onAboutClick: PropTypes.func
};

export default Header;