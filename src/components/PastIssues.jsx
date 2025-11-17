import React from 'react';
import PropTypes from 'prop-types';
import './PastIssues.css';

const PastIssues = ({ articles, onArticleClick, onClose }) => {
  const canvaArticles = articles.filter(
    article => article.canvaEmbed
  ).sort((a, b) => b.timestamp - a.timestamp); // Sort by date, newest first

  return (
    <div className="past-issues-overlay" onClick={onClose}>
      <div className="past-issues" onClick={(e) => e.stopPropagation()}>
        <div className="past-issues__header">
          <button className="past-issues__close" onClick={onClose}>×</button>
          <h1 className="past-issues__title">Past Issues</h1>
          <p className="past-issues__count">
            {canvaArticles.length} {canvaArticles.length === 1 ? 'issue' : 'issues'}
          </p>
        </div>
        
        <div className="past-issues__content">
          {canvaArticles.length > 0 ? (
            <div className="past-issues__grid">
              {canvaArticles.map((article) => (
                <div
                  key={article.id}
                  className="past-issue-card"
                  onClick={() => onArticleClick(article)}
                >
                  <div className="past-issue-card__canva-wrapper">
                    <iframe
                      loading="lazy"
                      className="past-issue-card__canva"
                      src={article.canvaEmbed}
                      title={article.title}
                      allowFullScreen="allowfullscreen"
                      allow="fullscreen"
                    />
                  </div>
                  <div className="past-issue-card__info">
                    <h3 className="past-issue-card__title">{article.title}</h3>
                    <p className="past-issue-card__date">
                      {article.timestamp.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {article.summary && (
                      <p className="past-issue-card__summary">{article.summary}</p>
                    )}
                  </div>
                  <div className="past-issue-card__overlay">
                    <span className="past-issue-card__overlay-text">View Full Issue</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="past-issues__empty">
              <p>No past issues available yet.</p>
              <p className="past-issues__empty-hint">
                Articles with Canva embeds will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PastIssues.propTypes = {
  articles: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PastIssues;
