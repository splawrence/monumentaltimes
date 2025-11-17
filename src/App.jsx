import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FeaturedArticle from './components/FeaturedArticle';
import CanvaEmbed from './components/CanvaEmbed';
import ArticleGrid from './components/ArticleGrid';
import Sidebar from './components/Sidebar';
import ArticleView from './components/ArticleView';
import AboutUs from './components/AboutUs';
import Policies from './components/Policies';
import SearchResults from './components/SearchResults';
import CategoryPage from './components/CategoryPage';
import PastIssues from './components/PastIssues';
import { loadArticlesFromMDX } from './utils/mdxLoader';
import './App.css';

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showPastIssues, setShowPastIssues] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load articles from MDX files in public/content/articles/
  useEffect(() => {
    const loadArticles = async () => {
      try {
        // Load articles from MDX files
        const mdxArticles = await loadArticlesFromMDX();
        
        console.log(`Loaded ${mdxArticles.length} articles from MDX files`);
        // Sort by date, newest first
        mdxArticles.sort((a, b) => b.timestamp - a.timestamp);
        setArticles(mdxArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

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

  const handlePoliciesClick = () => {
    setShowPolicies(true);
  };

  const handleClosePolicies = () => {
    setShowPolicies(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
  };

  const handleCategoryArticleClick = (article) => {
    setSelectedCategory(null);
    setSelectedArticle(article);
  };

  const handlePastIssuesClick = () => {
    setShowPastIssues(true);
  };

  const handleClosePastIssues = () => {
    setShowPastIssues(false);
  };

  const handlePastIssueClick = (article) => {
    setShowPastIssues(false);
    setSelectedArticle(article);
  };

  const handleSearch = (query) => {
    const results = articles.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      article.author.toLowerCase().includes(query.toLowerCase()) ||
      article.searchContent?.toLowerCase().includes(query.toLowerCase()) ||
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

  // Get featured article (most recent)
  const featuredArticle = articles[0];
  
  // Get the most recent article with a Canva embed
  const latestCanvaArticle = articles.find(article => article.canvaEmbed);
  
  // Get articles for grids
  const mainArticles = articles.slice(1, 7);
  const sidebarArticles = articles.slice(7, 10);

  return (
    <div className="app">
      <Header onAboutClick={handleAboutClick} onPoliciesClick={handlePoliciesClick} onSearch={handleSearch} onCategoryClick={handleCategoryClick} onPastIssuesClick={handlePastIssuesClick} />
      
      <main className="main-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>No Articles Yet</h2>
            <p>Create your first article in the TinaCMS admin panel at <a href="/admin">/admin</a></p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <FeaturedArticle 
                article={featuredArticle} 
                onClick={handleArticleClick}
                onCategoryClick={handleCategoryClick}
              />
            )}
            
            {/* Show latest Canva embed if available */}
            {latestCanvaArticle && latestCanvaArticle.canvaEmbed && (
              <div 
                className="canva-embed-container canva-embed-container--clickable"
                onClick={() => handleArticleClick(latestCanvaArticle)}
                style={{ cursor: 'pointer' }}
              >
                <div className="canva-embed-wrapper">
                  <iframe
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      width: '70%',
                      height: '1156px',
                      top: 0,
                      left: '15%',
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      pointerEvents: 'none'
                    }}
                    src={latestCanvaArticle.canvaEmbed}
                    allowFullScreen="allowfullscreen"
                    allow="fullscreen"
                    title="Latest Canva Design"
                  />
                </div>
                <div className="canva-embed-overlay">
                  <span className="canva-embed-overlay__text">Click to view full article</span>
                </div>
              </div>
            )}
            
            <hr className="section-divider" />
            
            {/* Main Content Layout */}
            <div className="homepage-layout">
              <div className="content-area">
                {/* Main Articles */}
                {mainArticles.length > 0 && (
                  <ArticleGrid 
                    articles={mainArticles} 
                    columns={3} 
                    title="Latest Articles" 
                    onArticleClick={handleArticleClick}
                    onCategoryClick={handleCategoryClick}
                  />
                )}
              </div>
              
              {/* Sidebar */}
              {sidebarArticles.length > 0 && (
                <Sidebar 
                  articles={sidebarArticles} 
                  onArticleClick={handleArticleClick}
                  onCategoryClick={handleCategoryClick}
                />
              )}
            </div>
          </>
        )}
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

      {/* Policies Modal */}
      {showPolicies && (
        <Policies onClose={handleClosePolicies} />
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

      {/* Category Page Modal */}
      {selectedCategory && (
        <CategoryPage
          category={selectedCategory}
          articles={articles}
          onArticleClick={handleCategoryArticleClick}
          onClose={handleCloseCategory}
        />
      )}

      {/* Past Issues Modal */}
      {showPastIssues && (
        <PastIssues
          articles={articles}
          onArticleClick={handlePastIssueClick}
          onClose={handleClosePastIssues}
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
              <li><button className="footer-link" onClick={handleAboutClick}>About Us</button></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><button className="footer-link" onClick={handlePoliciesClick}>Policies</button></li>
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
          <p>&copy; 2025 Monumental Times. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
