import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48 rounded" src={article.urlToImage} alt={article.title} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.source.name}</div>
          <Link to={`/article/${article.title}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{article.title}</Link>
          <p className="mt-2 text-gray-500">{article.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
