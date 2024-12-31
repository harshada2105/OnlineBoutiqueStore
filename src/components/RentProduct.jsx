import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const RentProduct = ({ userId, productId }) => {
  const [productDetails, setProductDetails] = useState({});
  const [formData, setFormData] = useState({
    size: '',
    start_date: '',
    end_date: '',
    rental_price: '',
    total_price: '',
    address: '',
    payment_method: ''
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProductDetails(response.data);
        setFormData((prevData) => ({
          ...prevData,
          rental_price: response.data.rental_price
        }));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const calculateTotalPrice = () => {
    const rentalPrice = parseFloat(formData.rental_price);
    const duration = new Date(formData.end_date) - new Date(formData.start_date);
    const days = duration / (1000 * 60 * 60 * 24) + 1; // Includes the last day
    const totalPrice = rentalPrice * days;
    setFormData((prevData) => ({
      ...prevData,
      total_price: totalPrice.toFixed(2)
    }));
  };

  useEffect(() => {
    if (formData.start_date && formData.end_date) {
      calculateTotalPrice();
    }
  }, [formData.start_date, formData.end_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rent_product', {
        ...formData,
        user_id: userId,
        product_id: productId,
        product_name: productDetails.name
      });
      if (response.data.success) {
        alert('Rental confirmed successfully! Remaining stock: ' + response.data.remaining_stock);
        window.location.href = '/rental_receipt/' + response.data.rental_id;
      } else {
        setFeedbackMessage(response.data.message || 'Error processing rental.');
      }
    } catch (error) {
      console.error('Error processing rental:', error);
      setFeedbackMessage('Error: Unable to confirm rental.');
    }
  };

  return (
    <div className="form-container">
      <h2>Confirm Rental</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="size">Size:</label>
        <input type="text" name="size" id="size" value={formData.size} onChange={handleChange} required /><br />
        <label htmlFor="start_date">Delivery Date:</label>
        <input type="date" name="start_date" id="start_date" value={formData.start_date} onChange={handleChange} required /><br />
        <label htmlFor="end_date">Return Date:</label>
        <input type="date" name="end_date" id="end_date" value={formData.end_date} onChange={handleChange} required /><br />
        <label htmlFor="rental_price">Rental Price:</label>
        <input type="text" name="rental_price" id="rental_price" value={formData.rental_price} readOnly /><br />
        <label htmlFor="total_price">Total Price:</label>
        <input type="text" name="total_price" id="total_price" value={formData.total_price} readOnly /><br />
        <label htmlFor="payment_method">Payment Method:</label>
        <select name="payment_method" id="payment_method" value={formData.payment_method} onChange={handleChange} required>
          <option value="">Select Payment Method</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery (COD)</option>
        </select><br />
        <label htmlFor="address">Delivery Address:</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required></textarea><br />
        <button type="submit" className="btn">Confirm Rental</button>
      </form>
    </div>
  );
};

export default RentProduct;
