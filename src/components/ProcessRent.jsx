import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const ProcessRent = ({ userId, productId }) => {
  const [productDetails, setProductDetails] = useState({});
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    rental_price: '',
    total_price: '',
    payment_method: '',
    address: ''
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

  const updatePaymentDetails = (e) => {
    const paymentMethod = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      payment_method: paymentMethod
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
      const response = await axios.post('/api/complete_rental', {
        ...formData,
        user_id: userId,
        product_id: productId,
        product_name: productDetails.name,
        product_image: productDetails.image
      });
      if (response.data.success) {
        alert('Rental confirmed successfully!');
        window.location.href = '/rental_receipt';
      } else {
        setFeedbackMessage('Error processing rental.');
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
        <label htmlFor="start_date">Delivery Date:</label>
        <input type="date" name="start_date" id="start_date" value={formData.start_date} onChange={handleChange} required /><br />
        <label htmlFor="end_date">Return Date:</label>
        <input type="date" name="end_date" id="end_date" value={formData.end_date} onChange={handleChange} required /><br />
        <label htmlFor="rental_price">Rental Price:</label>
        <input type="text" name="rental_price" id="rental_price" value={formData.rental_price} readOnly /><br />
        <label htmlFor="total_price">Total Price:</label>
        <input type="text" name="total_price" id="total_price" value={formData.total_price} readOnly /><br />
        <label htmlFor="payment_method">Payment Method:</label>
        <select name="payment_method" id="payment_method" value={formData.payment_method} onChange={updatePaymentDetails} required>
          <option value="">Select Payment Method</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery (COD)</option>
        </select><br />
        <div id="card_details" style={{ display: formData.payment_method === 'card' ? 'block' : 'none' }}>
          <label htmlFor="card_number">Card Number:</label>
          <input type="text" name="card_number" id="card_number" /><br />
          <label htmlFor="expiry_date">Expiry Date:</label>
          <input type="text" name="expiry_date" id="expiry_date" placeholder="MM/YY" /><br />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" name="cvv" id="cvv" /><br />
        </div>
        <div id="upi_details" style={{ display: formData.payment_method === 'upi' ? 'block' : 'none' }}>
          <label htmlFor="upi_id">UPI ID:</label>
          <input type="text" name="upi_id" id="upi_id" /><br />
        </div>
        <label htmlFor="address">Delivery Address:</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required></textarea><br />
        <button type="submit" className="btn">Confirm Rental</button>
      </form>
    </div>
  );
};

export default ProcessRent;
