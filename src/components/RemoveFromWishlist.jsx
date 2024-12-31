import React from 'react';
import axios from 'axios';

const RemoveFromWishlist = ({ userId, productId }) => {
  const handleRemove = async () => {
    try {
      await axios.post('/api/remove_from_wishlist', { user_id: userId, product_id: productId });
      // Redirect to the wishlist page or update the state to reflect changes
      window.location.href = '/wishlist';  // This will redirect to the wishlist page
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('There was an error removing the item from the wishlist.');
    }
  };

  return (
    <button onClick={handleRemove} className="btn">Remove from Wishlist</button>
  );
};

export default RemoveFromWishlist;
