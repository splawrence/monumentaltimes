import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import mtLogo from '../assets/mt-logo.png';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(window.innerWidth > 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen && searchQuery) {
      setSearchQuery('');
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSearchOpen(true);
      } else {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
            <button 
              className="search-toggle-btn"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className={`search-input-container ${isSearchOpen ? 'search-open' : ''}`}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                  aria-label="Search articles"
                />
                <button type="submit" className="search-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <nav className={`main-nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Main Navigation">
        <div className="nav-container">
          <div className={`nav-links${isMenuOpen ? ' nav-links--open' : ''}`}>
            <a href="#spiritual" className="nav-link" onClick={handleMenuItemClick}>Spiritual/Bible</a>
            <a href="#opinion" className="nav-link" onClick={handleMenuItemClick}>Opinion/Testimony</a>
            <a href="#news" className="nav-link" onClick={handleMenuItemClick}>News Flash</a>
            <a href="#biography" className="nav-link" onClick={handleMenuItemClick}>Biography/History</a>
            <a href="#recipes" className="nav-link" onClick={handleMenuItemClick}>Recipes</a>
            <a href="#poetry" className="nav-link" onClick={handleMenuItemClick}>Poetry & Art</a>
            <a href="#stories" className="nav-link" onClick={handleMenuItemClick}>Stories & Comics</a>
            <a href="#tech" className="nav-link" onClick={handleMenuItemClick}>Tech & Sports</a>
            <a href="#reviews" className="nav-link" onClick={handleMenuItemClick}>Reviews</a>
            {/* About Us and Policies links removed for footer relocation */}
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func
};

export default Header;