import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from '../Spinner';
import defaultImage from '../../assets/dumy.png';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import sampleData from '../../sampleData.json';

const News = ({ pageSize = 9, category = 'general', country = 'in', apiKey='' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `${capitalize(category)} - News App`;
    fetchInitialData();
  }, []);

  const generateId = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchData = async (url) => {
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.status !== 'error') {
        return parsedData;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    return sampleData;
  };

  const fetchInitialData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    const data = await fetchData(url);
    setArticles(data.articles);
    setTotalResults(data.totalResults);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    const data = await fetchData(url);
    setArticles(prevArticles => prevArticles.concat(data.articles || []));
    setTotalResults(data.totalResults);
    setPage(nextPage);
  };

  return (
    <>
      <h1 className='text-center' style={{ marginTop: '80px' }}>
        News App - Top {capitalize(category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((ele) => (
              <div className='col-md-4' key={ele.url + generateId()}>
                <NewsItem
                  title={ele.title ? ele.title.slice(0, 45) : ''}
                  description={ele.description ? ele.description.slice(0, 88) : ''}
                  imageUrl={ele.urlToImage || defaultImage}
                  newsUrl={ele.url}
                  author={ele.author || 'Unknown'}
                  date={ele.publishedAt}
                  source={ele.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string.isRequired,
  country: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News;
