import React from 'react';
import PropTypes from 'prop-types';
import './FeaturedArticle.css';

const FeaturedArticle = ({ article, onClick }) => {
  const {
    id,
    title,
    summary,
    author,
    timestamp,
    image,
    category,
    isBreaking = false
  } = article;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <article 
      className="featured-article"
      onClick={() => onClick && onClick(article)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {image && (
        <div className="featured-article__image">
          <img src={image} alt={title} />
          <div className="featured-article__overlay"></div>
        </div>
      )}
      
      <div className="featured-article__content">
        {(category || isBreaking) && (
          <div className="featured-article__meta-top">
            {isBreaking && (
              <span className="breaking-badge breaking-badge--large">Breaking News</span>
            )}
            {category && (
              <span className="category-badge category-badge--large">{category}</span>
            )}
          </div>
        )}
        
        <h1 className="featured-article__title">
          <a href={`/article/${id}`}>{title}</a>
        </h1>
        
        <p className="featured-article__summary">{summary}</p>
        
        <div className="featured-article__meta">
          {author && (
            <span className="featured-article__author">By {author}</span>
          )}
          <span className="featured-article__timestamp">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>
    </article>
  );
};

FeaturedArticle.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    author: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    isBreaking: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func
};

export default FeaturedArticle;