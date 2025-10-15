import React, { useState } from 'react';
import Header from './components/Header';
import FeaturedArticle from './components/FeaturedArticle';
import CanvaEmbed from './components/CanvaEmbed';
import ArticleGrid from './components/ArticleGrid';
import Sidebar from './components/Sidebar';
import ArticleView from './components/ArticleView';
import AboutUs from './components/AboutUs';
import SearchResults from './components/SearchResults';
import { featuredArticle, secondaryArticles, sidebarArticles, sampleArticles } from './data/sampleData';
import './App.css';

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleSearchResultClick = (article) => {
    setShowSearchResults(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

    const handleSearch = (query) => {
    const results = sampleArticles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      article.author.toLowerCase().includes(query.toLowerCase()) ||
      article.content?.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchQuery(query);
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleCloseSearch = () => {
    setShowSearchResults(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="app">
      <Header onAboutClick={handleAboutClick} onSearch={handleSearch} />
      
      <main className="main-content">
        {/* Featured Article */}
        <FeaturedArticle 
          article={featuredArticle} 
          onClick={handleArticleClick}
        />
        
        {/* Canva Embed - Prominent Feature */}
        <CanvaEmbed />
        
        <hr className="section-divider" />
        
        {/* Main Content Layout */}
        <div className="homepage-layout">
          <div className="content-area">
            {/* Secondary Articles */}
            <ArticleGrid 
              articles={secondaryArticles} 
              columns={3} 
              title="Latest News" 
              onArticleClick={handleArticleClick}
            />
            
            <hr className="section-divider--light" />
            
            {/* More Articles in 2-column layout */}
            <ArticleGrid 
              articles={secondaryArticles.slice(3)} 
              columns={2} 
              title="More Stories" 
              onArticleClick={handleArticleClick}
            />
          </div>
          
          {/* Sidebar */}
          <Sidebar 
            articles={sidebarArticles} 
            onArticleClick={handleArticleClick}
          />
        </div>
      </main>

      {/* Article View Modal */}
      {selectedArticle && (
        <ArticleView 
          article={selectedArticle} 
          onClose={handleCloseArticle}
        />
      )}

      {/* About Us Modal */}
      {showAbout && (
        <AboutUs onClose={handleCloseAbout} />
      )}

      {/* Search Results Modal */}
      {showSearchResults && (
        <SearchResults 
          searchQuery={searchQuery}
          searchResults={searchResults}
          onArticleClick={handleSearchResultClick}
          onClose={handleCloseSearch}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Monumental Times</h4>
            <p>Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of the stories that matter.</p>
          </div>
          
          <div className="footer-section">
            <h4>Sections</h4>
            <ul>
              <li><a href="#politics">Politics</a></li>
              <li><a href="#world">World</a></li>
              <li><a href="#business">Business</a></li>
              <li><a href="#technology">Technology</a></li>
              <li><a href="#opinion">Opinion</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter">Twitter</a>
              <a href="#facebook" aria-label="Facebook">Facebook</a>
              <a href="#instagram" aria-label="Instagram">Instagram</a>
              <a href="#linkedin" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Monumental Times. All rights reserved. | October 18th, 2025 Issue</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
