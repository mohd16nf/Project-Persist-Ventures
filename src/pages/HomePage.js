// src/pages/Homepage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticles, setPage } from '../features/articles/articlesSlice';
import ArticleSummary from '../componets/ArticleSummary';
import CategoriesDropdown from '../componets/CategoriesDropdown';
import SearchBar from '../componets/SearchBar';

const Homepage = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const selectedCategory = useSelector((state) => state.articles.selectedCategory);
  const status = useSelector((state) => state.articles.status);
  const currentPage = useSelector((state) => state.articles.currentPage);

  useEffect(() => {
    dispatch(fetchArticles({ category: selectedCategory, page: currentPage }));
  }, [dispatch, selectedCategory, currentPage]);

  const filteredArticles = selectedCategory === 'all'
    ? Object.values(articles).flat()
    : articles[selectedCategory] || [];

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="px-5 md:px-10 lg:px-12 xl:px-20 py-5 md:py-10 xl:py-12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <CategoriesDropdown />
        <SearchBar />
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {filteredArticles.length === 0 && status !== 'loading' && (
        <p>No related info found.</p>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleSummary key={article.title} article={article} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Homepage;
