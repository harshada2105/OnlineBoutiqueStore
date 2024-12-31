import React, { useState } from 'react';
import axios from 'axios';

const AddToWishlist = ({ productId }) => {
  const [message, setMessage] = useState('');

  const addToWishlist = async () => {
    try {
      const response = await axios.post('/api/add_to_wishlist', { product_id: productId });
      if (response.data.success) {
        setMessage('Product added to wishlist successfully!');
      } else if (response.data.message === 'exists') {
        setMessage('This product is already in your wishlist!');
      } else {
        setMessage('Error adding product to wishlist.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Error: Unable to add product to wishlist.');
    }
  };

  return (
    <div>
      <button onClick={addToWishlist}>Add to Wishlist</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddToWishlist;
