import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/user.css';  // Adjust the path as needed

const ThankYou = () => {
  return (
    <div className="thank-you">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your payment has been submitted successfully.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default ThankYou;
