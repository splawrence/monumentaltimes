import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import './Sidebar.css';

const Sidebar = ({ articles, title = "More Stories", onArticleClick }) => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar__title">{title}</h3>
      <div className="sidebar__content">
        {articles.map((article, index) => (
          <div key={article.id || index} className="sidebar__item">
            <ArticleCard 
              article={article} 
              size="small" 
              onClick={onArticleClick}
            />
          </div>
        ))}
      </div>
      
      {/* Newsletter Signup */}
      <div className="sidebar__newsletter">
        <h4 className="newsletter__title">Stay Informed</h4>
        <p className="newsletter__description">
          Get the latest news delivered straight to your inbox.
        </p>
        <form className="newsletter__form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="newsletter__input"
            aria-label="Email address for newsletter signup"
          />
          <button type="submit" className="newsletter__button">
            Subscribe
          </button>
        </form>
      </div>

      {/* Most Read Section */}
      <div className="sidebar__section">
        <h4 className="sidebar__section-title">Most Read</h4>
        <div className="most-read__list">
          {articles.slice(0, 5).map((article, index) => (
            <div key={article.id || `most-read-${index}`} className="most-read__item">
              <span className="most-read__number">{index + 1}</span>
              <a href={`/article/${article.id}`} className="most-read__title">
                {article.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  onArticleClick: PropTypes.func
};

export default Sidebar;