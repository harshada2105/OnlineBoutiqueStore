import React from 'react';
import axios from 'axios';

const UpdateCart = ({ userId, productId }) => {
  const updateCart = async (action) => {
    try {
      await axios.post('/api/update_cart', { user_id: userId, product_id: productId, action });
      // Redirect to the cart page or update the state to reflect changes
      window.location.href = '/cart';  // This will redirect to the cart page
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('There was an error updating the cart.');
    }
  };

  return (
    <div>
      <button onClick={() => updateCart('increase')} className="cart-btn">Increase Quantity</button>
      <button onClick={() => updateCart('decrease')} className="cart-btn">Decrease Quantity</button>
    </div>
  );
};

export default UpdateCart;
