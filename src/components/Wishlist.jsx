import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'remixicon/fonts/remixicon.css';  // Remix Icons

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/api/wishlist/${userId}`);
        setWishlist(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Error fetching wishlist.');
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post('/api/remove_from_wishlist', { user_id: userId, product_id: productId });
      setWishlist(wishlist.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Error: Unable to remove item from wishlist.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="wishlist">
      <h1 className="heading">Your <span>Wishlist</span></h1>
      <div className="box-container">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div className="box" key={item.product_id}>
              <div className="image">
                <img src={item.image} alt={item.product_name} className="center-img" />
              </div>
              <div className="content">
                <h3>{item.product_name}</h3>
                <p>Rental Price: Rs. {item.rental_price}</p>
                <button onClick={() => removeFromWishlist(item.product_id)} className="btn">Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
