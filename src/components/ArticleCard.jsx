import React from 'react';
import PropTypes from 'prop-types';
import './ArticleCard.css';

const ArticleCard = ({ article, size = 'medium', onClick }) => {
  const {
    id,
    title,
    summary,
    author,
    timestamp,
    image,
    category,
    readTime,
    isBreaking = false
  } = article;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  return (
    <article 
      className={`article-card article-card--${size}`}
      onClick={() => onClick && onClick(article)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {image && (
        <div className="article-card__image">
          <img src={image} alt={title} />
        </div>
      )}
      
      <div className="article-card__content">
        {(category || isBreaking) && (
          <div className="article-card__meta-top">
            {isBreaking && (
              <span className="breaking-badge">Breaking</span>
            )}
            {category && (
              <span className="category-badge">{category}</span>
            )}
          </div>
        )}
        
        <h3 className="article-card__title">
          <a href={`/article/${id}`}>{title}</a>
        </h3>
        
        {summary && size !== 'small' && (
          <p className="article-card__summary">{summary}</p>
        )}
        
        <div className="article-card__meta">
          {author && (
            <span className="article-card__author">By {author}</span>
          )}
          <span className="article-card__timestamp">
            {formatTimestamp(timestamp)}
          </span>
          {readTime && (
            <span className="article-card__read-time">{readTime} min read</span>
          )}
        </div>
      </div>
    </article>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    author: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    readTime: PropTypes.number,
    isBreaking: PropTypes.bool
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func
};

export default ArticleCard;