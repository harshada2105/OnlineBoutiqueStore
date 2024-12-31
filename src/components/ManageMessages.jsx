import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import '../styles/admin_style.css';  // Adjust the path as needed

const ManageMessages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Verify admin role
        const roleResponse = await axios.get(`/api/verify_admin/${userId}`);
        if (roleResponse.data.role !== 'admin') {
          alert('Access denied!');
          navigate('/login');
          return;
        }

        // Fetch messages
        const response = await axios.get('/api/messages');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages.');
        setLoading(false);
      }
    };
    fetchMessages();
  }, [userId, navigate]);

  const handleResponse = async (messageId, userId, responseText) => {
    try {
      await axios.post('/api/respond_message', {
        message_id: messageId,
        user_id: userId,
        response: responseText
      });
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, response: responseText } : msg
      ));
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Error: Unable to send response.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AdminHeader />
      <h1>Manage Messages</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Name</th>
            <th>Message</th>
            <th>Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.username}</td>
                <td>{msg.email}</td>
                <td>{msg.name}</td>
                <td>{msg.message}</td>
                <td>{msg.response}</td>
                <td>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const responseText = e.target.response.value;
                      handleResponse(msg.id, msg.user_id, responseText);
                    }}
                  >
                    <textarea name="response" defaultValue={msg.response} required></textarea>
                    <button type="submit">Send Response</button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No messages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ManageMessages;
