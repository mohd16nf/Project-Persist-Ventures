import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { selectedCategory } = useSelector((state) => state.articles);
  const articlesByCategory = useSelector((state) => state.articles.articles);

  // Find the article in the selected category
  const articles = articlesByCategory[selectedCategory];
  const article = articles.find((article) => article.title === decodeURIComponent(title));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        className="bg-indigo-700 text-white border-2 border-grey-700 py-2 px-5 hover:bg-white hover:text-indigo-700 rounded transition-ease-in-out duration-500"
        onClick={() => navigate('/')}
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold">{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full my-4 rounded" />
      )}
      <p className="text-lg">{article.description}</p>
      <p className="mt-4">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
