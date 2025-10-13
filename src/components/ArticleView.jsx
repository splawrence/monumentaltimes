import React from 'react';
import PropTypes from 'prop-types';
import './ArticleView.css';

const ArticleView = ({ article, onClose }) => {
  const {
    title,
    content,
    author,
    timestamp,
    image,
    category,
    readTime
  } = article;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="article-view-overlay" onClick={onClose}>
      <article className="article-view" onClick={(e) => e.stopPropagation()}>
        <header className="article-view__header">
          <button className="article-view__close" onClick={onClose}>×</button>
          <div className="article-view__meta">
            <span className="category-badge">{category}</span>
            <span className="read-time">{readTime} min read</span>
          </div>
          <h1 className="article-view__title">{title}</h1>
          <div className="article-view__byline">
            <span className="author">By {author}</span>
            <span className="timestamp">{formatTimestamp(timestamp)}</span>
          </div>
        </header>

        {image && (
          <div className="article-view__image">
            <img src={image} alt={title} />
          </div>
        )}

        <div className="article-view__content">
          {content ? (
            content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-view__paragraph">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="article-view__paragraph">
              This is the full content of the article. In a real application, 
              this would contain the complete article text with proper formatting.
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

ArticleView.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    image: PropTypes.string,
    category: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ArticleView;