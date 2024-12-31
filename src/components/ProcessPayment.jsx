import React, { useState } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const ProcessPayment = ({ userId }) => {
  const [formData, setFormData] = useState({
    payment_method: '',
    address: ''
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.payment_method || !formData.address) {
      alert('Error: Payment method and address are required.');
      return;
    }

    try {
      const response = await axios.post('/api/process_payment', { ...formData, user_id: userId });
      if (response.data.success) {
        alert('Payment submitted successfully!');
        window.location.href = '/thank_you';  // Redirect to thank you page
      } else {
        setFeedbackMessage('Error: Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to process payment.');
    }
  };

  return (
    <div>
      <h2>Process Payment</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="payment_method">Payment Method:</label>
        <input
          type="text"
          name="payment_method"
          id="payment_method"
          placeholder="Payment Method"
          value={formData.payment_method}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default ProcessPayment;
