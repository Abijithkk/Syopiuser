import React, { useCallback, useEffect, useState } from 'react';
import './category.css';
import C1 from '../images/C1.jpeg';
import C2 from '../images/C2.jpeg';
import C3 from '../images/C3.jpeg';
import C4 from '../images/C4.jpeg';
import C5 from '../images/C5.jpeg';
import C6 from '../images/C6.jpeg';
import C7 from '../images/C7.jpeg';
import C8 from '../images/C8.jpeg';
import C9 from '../images/C9.jpeg';
import C10 from '../images/C10.jpeg';
import C11 from '../images/C11.jpeg';
import C12 from '../images/C12.jpeg';
import { getCategoriesApi } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';

function Category() {
 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories using useCallback to prevent unnecessary re-renders
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategoriesApi();
      
      if (response && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        throw new Error("Invalid data format received.");
      }
    } catch (err) {
      setError(err.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const cardData = [
    { title: 'Makeup Set', image: C1 },
    { title: 'T Shirts', image: C2 },
    { title: 'Jeans', image: C3 },
    { title: 'Casual Shirts', image: C4 },
    { title: 'Sneaker', image: C5 },
    { title: 'Sarees', image: C6 },
    { title: 'Flipflops', image: C7 },
    { title: 'Jewellery', image: C8 },
    { title: 'Hand Bags', image: C9 },
    { title: 'Socks', image: C10 },
    { title: 'Trolley Bags', image: C11 },
    { title: 'Caps', image: C12 },
  ];

  return (
    <div>
      <div>
        <p className="category-heading">Category</p>
        <div className="category-container">
          {/* Left Column */}
          <div className="category-left">
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              <span className="category-name">{category.name}</span>
              <img
                src={`${BASE_URL}/uploads/${category.image}`}
                alt={category.name}
                className="category-image"
              />
            </li>
          ))}
        </ul>
      )}
    </div>


          {/* Right Section */}
          <div className="category-right">
            {cardData.map((card, index) => (
              <div className="category-card" key={index}>
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
