import React from 'react';
import PropTypes from 'prop-types';
import ArticleGrid from './ArticleGrid';
import './CategoryPage.css';

const CategoryPage = ({ category, articles, onArticleClick, onClose }) => {
  const categoryArticles = articles.filter(
    article => article.category === category
  );

  return (
    <div className="category-page-overlay" onClick={onClose}>
      <div className="category-page" onClick={(e) => e.stopPropagation()}>
        <div className="category-page__header">
          <button className="category-page__close" onClick={onClose}>×</button>
          <h1 className="category-page__title">{category}</h1>
          <p className="category-page__count">
            {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
        
        <div className="category-page__content">
          {categoryArticles.length > 0 ? (
            <ArticleGrid 
              articles={categoryArticles} 
              columns={3}
              onArticleClick={onArticleClick}
            />
          ) : (
            <div className="category-page__empty">
              <p>No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CategoryPage.propTypes = {
  category: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CategoryPage;
