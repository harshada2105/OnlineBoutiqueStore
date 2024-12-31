import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post('/api/logout');  // Ensure you have this endpoint on your backend
        // Clear any stored user session or authentication tokens
        localStorage.removeItem('userToken');
        sessionStorage.removeItem('userToken');
        // Redirect to the login page
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
