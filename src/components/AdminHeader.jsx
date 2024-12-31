import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin_style.css';  // Adjust the path as needed

const AdminHeader = () => {
  return (
    <header>
      <nav>
        <Link to="/admin_dashboard">Dashboard</Link>
        <Link to="/manage_users">Manage Users</Link>
        <Link to="/manage_products">Manage Products</Link>
        <Link to="/manage_stock">Manage Stock</Link>
        <Link to="/view_rentals">View Rentals</Link>
        <Link to="/manage_messages">Manage Messages</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
