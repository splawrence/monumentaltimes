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
    readTime,
    canvaEmbed
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

        {canvaEmbed && (
          <div className="article-view__canva-embed">
            <iframe
              loading="lazy"
              src={canvaEmbed}
              allowFullScreen=""
              allow="fullscreen"
              title="Canva Design"
              style={{
                position: 'absolute',
                width: '100%',
                height: '1138px',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
            />
          </div>
        )}

        <div className="article-view__content">
          {content?.split('\n\n').map((paragraph) => (
            <p key={paragraph} className="article-view__paragraph">
              {paragraph}
            </p>
          ))}
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
    readTime: PropTypes.number.isRequired,
    canvaEmbed: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ArticleView;