import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/user.css';  // Import the user CSS file

const Header = () => {
  const [newNotifications, setNewNotifications] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/check-session');  // Replace with actual endpoint
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          const notificationsResponse = await axios.get('/api/notifications');  // Replace with actual endpoint
          setNewNotifications(notificationsResponse.data.newNotifications);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const toggleSearchForm = () => {
    const searchForm = document.getElementById('search-form');
    const icons = document.querySelectorAll('.icons a:not(#search-icon)');
    if (searchForm.style.display === 'none' || searchForm.style.display === '') {
      searchForm.style.display = 'flex';
      icons.forEach(icon => {
        icon.style.display = 'none';
      });
    } else {
      searchForm.style.display = 'none';
      icons.forEach(icon => {
        icon.style.display = 'inline';
      });
    }
  };

  return (
    <header>
      <input type="checkbox" name="" id="toggler"/>
      <label htmlFor="toggler" className="fas fa-bars"></label>
      <Link to="/" className="logo">TrendyThreads<span>.</span></Link>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="icons">
        <button className="fas fa-search" id="search-icon" onClick={toggleSearchForm} aria-label="Search"></button>
        <Link to="/wishlist" className="fas fa-heart"></Link>
        <Link to="/rent" className="fas fa-shopping-cart"></Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="fas fa-user"></Link>
            <Link to="/notifications" className="fas fa-bell" id="notification">
              {newNotifications > 0 && <span className="red-dot"></span>}
            </Link>
          </>
        ) : (
          <Link to="/login" className="fas fa-user"></Link>
        )}
      </div>
      <form method="GET" action="/search_results" id="search-form" style={{ display: 'none' }}>
        <input type="text" name="query" placeholder="Search..."/>
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
