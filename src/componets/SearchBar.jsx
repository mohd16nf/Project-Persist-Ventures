import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchArticles } from '../features/articles/articlesSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchArticles(searchTerm));
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mt-4 md:mt-0">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles..."
        className="appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        className="bg-indigo-700 text-white border-2 border-indigo-700 py-2 px-4 hover:bg-white hover:text-indigo-700 rounded transition duration-300 ease-in-out"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
