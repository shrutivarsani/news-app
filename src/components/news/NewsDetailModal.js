import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import defaultImage from "../../assets/dumy.png";

const NewsDetailModal = ({ show, onHide, newsData }) => {
  const { title, description, imageUrl='', newsUrl='', author='', date } = newsData || {};
  
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = defaultImage;
    event.target.alt = "dummy image";
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={imageUrl || defaultImage}
            alt="news"
            className="img-fluid"
            onError={handleImageError}
          />
        </div>
        <div className="mt-3">
          <p>{description}</p>
          <p><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
        </div>
        <a href={newsUrl} target='_blank' rel='noopener noreferrer' className="btn btn-primary">
          Read Full Article
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsDetailModal;
