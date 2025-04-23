import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/news/News';
import SearchNews from './components/news/SearchNews';
import NewsDetail from './components/news/NewsDetailModal';

const App = () => {
  const page = 12;
  const news_api = process.env.REACT_APP_NEWS_API||'';

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <News
                key='general'
                apiKey={news_api}
                pageSize={page}
                country='us'
                category='general'
              />
            }
          />
          <Route path='/search' element={<SearchNews apiKey={news_api} />} />
          <Route path='/detail' element={<NewsDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;