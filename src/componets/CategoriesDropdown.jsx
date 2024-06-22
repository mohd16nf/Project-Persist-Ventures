import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchArticles } from '../features/articles/articlesSlice';

const CategoriesDropdown = () => {
  const dispatch = useDispatch();
  const categories = ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const selectedCategory = useSelector((state) => state.articles.selectedCategory);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(setCategory(category));
    if (category === 'all') {
      dispatch(fetchArticles(''));
    } else {
      dispatch(fetchArticles(category));
    }
  };

  return (
    <div className="relative inline-block w-full md:w-48">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="block w-full md:w-48 px-4 py-2 bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring"
      >
        {categories.map((category) => (
          <option key={category} value={category} id='option-menu'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesDropdown;
