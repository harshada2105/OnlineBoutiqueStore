import React, { useState } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const ProcessRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
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
        alert('Signup successful!');
        window.location.href = '/home';  // Redirect to home page
      } else {
        setFeedbackMessage('Error: Could not register.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to register.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default ProcessRegister;
