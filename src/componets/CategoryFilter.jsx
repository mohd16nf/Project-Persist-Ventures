// src/components/CategoryFilter.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchArticles } from '../features/articles/articlesSlice';

const categories = ['All', 'Business', 'Technology', 'Entertainment', 'Health', 'Science', 'Sports'];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.articles.selectedCategory);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchArticles(category === 'All' ? '' : category));
  };

  return (
    <div className="relative inline-block">
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="px-4 py-2 bg-white border rounded"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
