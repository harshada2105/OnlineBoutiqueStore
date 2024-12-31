import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import '../styles/admin_style.css';  // Adjust the path as needed

const RespondMessage = ({ userId, messageId }) => {
  const [messageDetails, setMessageDetails] = useState({
    email: '',
    name: '',
    response: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        // Verify admin role
        const roleResponse = await axios.get(`/api/verify_admin/${userId}`);
        if (roleResponse.data.role !== 'admin') {
          alert('Access denied!');
          navigate('/login');
          return;
        }

        // Fetch message details
        const response = await axios.get(`/api/message_details/${messageId}`);
        setMessageDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message details:', error);
        setError('Error fetching message details.');
        setLoading(false);
      }
    };
    fetchMessageDetails();
  }, [userId, messageId, navigate]);

  const handleResponse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/respond_message', {
        message_id: messageId,
        user_id: userId,
        response: messageDetails.response
      });
      alert('Response sent successfully!');
      navigate('/manage_messages');
    } catch (error) {
      console.error('Error sending response:', error);
      setError('Error: Unable to send response.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AdminHeader />
      <section className="respond-message">
        <h1>Respond to Message</h1>
        <form onSubmit={handleResponse}>
          <p><strong>Email:</strong> {messageDetails.email}</p>
          <p><strong>Name:</strong> {messageDetails.name}</p>
          <label htmlFor="response">Response:</label>
          <textarea
            name="response"
            value={messageDetails.response}
            onChange={(e) => setMessageDetails({ ...messageDetails, response: e.target.value })}
            required
          ></textarea>
          <button type="submit">Send Response</button>
        </form>
      </section>
    </>
  );
};

export default RespondMessage;
