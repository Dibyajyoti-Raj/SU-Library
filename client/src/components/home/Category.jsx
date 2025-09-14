import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../BackButton';

const categories = [
  "C++",
  "Algorithms",
  "DBMS",
  "Machine Learning",
  "Computer Networks",
  "NLP",
  "Software Engineering",
];

const CategoryCards = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/search?genre=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container mt-3">
    <div className="ml-3 "><BackButton /></div>
      <h2 className="text-center text-3xl">Explore Book Categories</h2>
      <div className="row g-4">
        {categories.map((category, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div 
              className="category-card card h-100 shadow-sm border-0 transition-all"
              onClick={() => handleCategoryClick(category)}
              >
              <div className="card-body d-flex flex-column justify-content-center text-center p-4">
                <h5 className="card-title mb-0 fw-semibold">
                  <i className="fas fa-book-open me-2"></i>
                  {category}
                </h5>
                <small className="text-muted mt-2" onClick={handleCategoryClick(category)}>View all {category} books</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;