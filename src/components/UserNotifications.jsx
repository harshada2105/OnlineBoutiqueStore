import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'remixicon/fonts/remixicon.css';  // Remix Icons

const UserNotifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Mark notifications as read
        await axios.post('/api/mark_notifications_read', { user_id: userId });

        // Fetch notifications
        const response = await axios.get(`/api/notifications/${userId}`);
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications.');
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Notifications</h1>
      <table className="notification-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <tr key={index}>
                <td>{notif.message}</td>
                <td>{notif.created_at}</td>
                <td className={notif.seen ? 'read' : 'unread'}>
                  {notif.seen ? 'Read' : 'Unread'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No notifications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserNotifications;
