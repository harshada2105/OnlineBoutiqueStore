import React, { useState } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    phone: '',
    address: '',
    email: '',
    password: ''
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
    try {
      const response = await axios.post('/api/register', formData);
      if (response.data.success) {
        alert('Registration successful!');
        window.location.href = '/login';  // Redirect to login page
      } else {
        setFeedbackMessage('Error: Could not register.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to register.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required /><br />
        <label htmlFor="full_name">Full Name:</label>
        <input type="text" name="full_name" id="full_name" value={formData.full_name} onChange={handleChange} required /><br />
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required /><br />
        <label htmlFor="address">Address:</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required></textarea><br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
