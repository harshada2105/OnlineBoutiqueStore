import React, { useState } from 'react';
import axios from 'axios';

const CompleteRental = ({ userId }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    product_image: '',
    start_date: '',
    end_date: '',
    rental_price: '',
    total_price: '',
    address: '',
    payment_method: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/complete_rental', { ...formData, user_id: userId });
      if (response.data.success) {
        alert('Rental confirmed successfully!');
        window.location.href = `/rental_receipt/${response.data.rental_id}`;
      } else {
        setMessage('Error completing rental.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('Error: Unable to complete rental.');
    }
  };

  return (
    <div>
      <h2>Complete Rental</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="user_id" value={userId} />
        <input type="text" name="product_id" placeholder="Product ID" value={formData.product_id} onChange={handleChange} required />
        <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} required />
        <input type="text" name="product_image" placeholder="Product Image URL" value={formData.product_image} onChange={handleChange} required />
        <input type="date" name="start_date" placeholder="Start Date" value={formData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" placeholder="End Date" value={formData.end_date} onChange={handleChange} required />
        <input type="number" name="rental_price" placeholder="Rental Price" value={formData.rental_price} onChange={handleChange} required />
        <input type="number" name="total_price" placeholder="Total Price" value={formData.total_price} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="payment_method" placeholder="Payment Method" value={formData.payment_method} onChange={handleChange} required />
        <button type="submit">Confirm Rental</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompleteRental;
