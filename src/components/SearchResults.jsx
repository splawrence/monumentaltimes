import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import './SearchResults.css';

const SearchResults = ({ searchQuery, searchResults, onArticleClick, onClose }) => {
  return (
    <div className="search-results-overlay" onClick={onClose}>
      <div className="search-results" onClick={(e) => e.stopPropagation()}>
        <div className="search-results__header">
          <button className="search-results__close" onClick={onClose}>×</button>
          <h2 className="search-results__title">
            Search Results for "{searchQuery}"
          </h2>
          <p className="search-results__count">
            {searchResults.length} {searchResults.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
        
        <div className="search-results__content">
          {searchResults.length > 0 ? (
            <div className="search-results__grid">
              {searchResults.map((article) => (
                <div key={article.id} className="search-results__item">
                  <ArticleCard 
                    article={article} 
                    size="medium" 
                    onClick={onArticleClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="search-results__empty">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or browse our latest articles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  onArticleClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SearchResults;