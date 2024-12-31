import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin_style.css';  // Adjust the path as needed

const AdminDashboard = ({ userId }) => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRentals: 0,
    newMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminMetrics = async () => {
      try {
        // Verify admin role
        const roleResponse = await axios.get(`/api/verify_admin/${userId}`);
        if (roleResponse.data.role !== 'admin') {
          alert('Access denied!');
          navigate('/login');
          return;
        }

        // Fetch admin metrics
        const [usersResponse, productsResponse, rentalsResponse, messagesResponse] = await Promise.all([
          axios.get('/api/total_users'),
          axios.get('/api/total_products'),
          axios.get('/api/total_rentals'),
          axios.get('/api/new_messages')
        ]);

        setMetrics({
          totalUsers: usersResponse.data.count,
          totalProducts: productsResponse.data.count,
          totalRentals: rentalsResponse.data.count,
          newMessages: messagesResponse.data.count
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin metrics:', error);
        setError('Error fetching admin metrics.');
        setLoading(false);
      }
    };
    fetchAdminMetrics();
  }, [userId, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="dashboard">
      <h1 className="heading">Admin Dashboard</h1>
      <div className="metrics-container">
        <div className="metric-box">
          <h3><a href="/manage_users">Total Users</a></h3>
          <p>{metrics.totalUsers}</p>
        </div>
        <div className="metric-box">
          <h3><a href="/manage_products">Total Products</a></h3>
          <p>{metrics.totalProducts}</p>
        </div>
        <div className="metric-box">
          <h3><a href="/view_rentals">Total Rentals</a></h3>
          <p>{metrics.totalRentals}</p>
        </div>
        <div className="metric-box">
          <h3><a href="/manage_messages">New Messages</a></h3>
          <p>{metrics.newMessages}</p>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
