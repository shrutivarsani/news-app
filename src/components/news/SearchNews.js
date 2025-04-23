import React, { useState } from 'react';
import Spinner from '../Spinner';
import NewsItem from './NewsItem';

const SearchNews = ({ apiKey }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('us');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?q=${keyword}&category=${category}&country=${country}&page=${page}&pageSize=10&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  const handlePageChange = async (direction) => {
    const newPage = direction === 'next' ? page + 1 : page - 1;
    setPage(newPage);
    await handleSearch();
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">News Search</h2>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="us">USA</option>
            <option value="in">India</option>
            <option value="gb">UK</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {loading && <Spinner />}

      <div className="row">
        {!loading && articles.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              newsUrl={article.url}
              author={article.author}
              date={article.publishedAt}
              source={article.source.name}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between my-4">
        <button
          className="btn btn-dark"
          disabled={page <= 1}
          onClick={() => handlePageChange('prev')}
        >
          &larr; Previous
        </button>
        <button
          className="btn btn-dark"
          disabled={page >= Math.ceil(totalResults / 10)}
          onClick={() => handlePageChange('next')}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default SearchNews;
