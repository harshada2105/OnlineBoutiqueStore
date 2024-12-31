import React, { useState } from 'react';
import axios from 'axios';

const ProcessLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('/api/login', formData);
      if (response.data.success) {
        alert('Login successful!');
        window.location.href = '/home';  // Redirect to home page
      } else {
        setFeedbackMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
};

export default ProcessLogin;
