import React, { useState } from 'react';
import NewsDetailModal from './NewsDetailModal';
import defaultImage from "../../assets/dumy.png";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleClick = () => {
    setSelectedNews({ title, description, imageUrl, newsUrl, author, date });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="my-3">
      <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: '85%' }}>
          {source}
        </span>
        <img
          src={imageUrl || defaultImage}
          className="card-img-top"
          alt={title}
          loading="lazy"
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={handleClick}>
            {title}
          </h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author || 'Unknown'} on {new Date(date).toGMTString()}
            </small>
          </p>
        </div>
      </div>

      <NewsDetailModal show={showModal} onHide={handleCloseModal} newsData={selectedNews} />
    </div>
  );
};

export default NewsItem;
