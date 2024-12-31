import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const Profile = ({ userId }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

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
      const response = await axios.post('/api/update_profile', { ...formData, user_id: userId });
      if (response.data.success) {
        alert('Profile updated successfully!');
        window.location.href = '/profile';
      } else {
        setFeedbackMessage('Error: Could not update profile.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to update profile.');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Profile</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required /><br />
        <label htmlFor="address">Address:</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required></textarea><br />
        <label htmlFor="password">New Password (leave blank to keep current password):</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} /><br />
        <button type="submit" className="btn">Update Profile</button>
      </form>
      <a href="/logout" className="fas fa-sign-out-alt">Logout</a>
    </div>
  );
};

export default Profile;
