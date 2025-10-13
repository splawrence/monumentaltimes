import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import './ArticleGrid.css';

const ArticleGrid = ({ articles, columns = 3, title, onArticleClick }) => {
  return (
    <section className="article-grid">
      {title && <h2 className="article-grid__title">{title}</h2>}
      <div className={`article-grid__container article-grid--${columns}-col`}>
        {articles.map((article, index) => (
          <div key={article.id || index} className="article-grid__item">
            <ArticleCard 
              article={article} 
              size="medium" 
              onClick={onArticleClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

ArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.number,
  title: PropTypes.string,
  onArticleClick: PropTypes.func
};

export default ArticleGrid;