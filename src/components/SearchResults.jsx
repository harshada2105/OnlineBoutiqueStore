import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'remixicon/fonts/remixicon.css';  // Remix Icons

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/search`, {
          params: { query }
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Error fetching search results.');
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="search-results">
      <h1>Search Results for "{query}"</h1>
      <div className="box-container">
        {results.length > 0 ? (
          results.map((product) => (
            <div className="box" key={product.id}>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="price">
                  <p>Price: Rs. {product.price}</p>
                  <p>Rental Price: Rs. {product.rental_price}</p>
                </div>
                <div className="buttons">
                  <form method="POST" action="/add_to_wishlist">
                    <input type="hidden" name="product_id" value={product.id} />
                    <button type="submit" className="wishlist-btn">Add to Wishlist</button>
                  </form>
                  <form method="POST" action="/rent_product">
                    <input type="hidden" name="product_id" value={product.id} />
                    <input type="hidden" name="rental_price" value={product.rental_price} />
                    <button type="submit" className="rent-btn">Rent</button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
