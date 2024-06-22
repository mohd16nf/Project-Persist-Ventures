// src/components/ArticleSummary.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleSummary = ({ article }) => {
  const { title, urlToImage, description } = article;

  return (
    <div className="border-b border-gray-200 py-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {urlToImage && (
        <img src={urlToImage} alt={title} className="w-full my-2 rounded" />
      )}
      <p className='mb-2'>{description}</p>
      <Link to={`/article/${encodeURIComponent(title)}`} className="bg-indigo-700 text-white border-2 border-grey-700 py-2 px-6 hover:bg-white hover:text-indigo-700 rounded transition-ease-in-out duration-500">
        Read more
      </Link>
    </div>
  );
};

export default ArticleSummary;
