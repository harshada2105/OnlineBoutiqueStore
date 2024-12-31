import React, { useState } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const Contact = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
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
      const response = await axios.post('/api/contact', { ...formData, user_id: userId });
      if (response.data.success) {
        alert('Message sent successfully!');
        window.location.href = '/contact';
      } else {
        setFeedbackMessage('Error: Could not send message.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setFeedbackMessage('Error: Unable to send message.');
    }
  };

  return (
    <div>
      <section className="contact" id="contact">
        <h1 className="heading"> <span> contact </span> us </h1>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" className="box" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="box" value={formData.email} onChange={handleChange} required />
            <input type="number" name="number" placeholder="Number" className="box" value={formData.number} onChange={handleChange} required />
            <textarea name="message" className="box" placeholder="Message" cols="30" rows="10" value={formData.message} onChange={handleChange} required></textarea>
            <input type="submit" value="Send Message" className="btn" />
          </form>
          <div className="image">
            <img src={require('../assets/images/contactus.png')} alt="Contact Us" />
          </div>
        </div>
      </section>
      {feedbackMessage && <p>{feedbackMessage}</p>}
    </div>
  );
};

export default Contact;
