import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const UpdateProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: ''
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setFormData({
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setFeedbackMessage('Error: Unable to fetch user data.');
      }
    };
    fetchUserData();
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
      await axios.post('/api/update_profile', { ...formData, user_id: userId });
      alert('Profile updated successfully!');
      window.location.href = '/profile';  // Redirect to profile page
    } catch (error) {
      console.error('Error updating profile:', error);
      setFeedbackMessage('Error: Unable to update profile.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Profile</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required /><br />
        <label htmlFor="address">Address:</label>
        <textarea name="address" id="address" value={formData.address} onChange={handleChange} required></textarea><br />
        <button type="submit" className="btn">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
