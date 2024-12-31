import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed

const Rent = ({ userId }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await axios.get(`/api/rentals/${userId}`);
        setRentals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rental history:', error);
        setError('Error fetching rental history.');
        setLoading(false);
      }
    };
    fetchRentals();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="heading">Your <span>Rental History</span></h1>
      <section className="rental-history">
        <div className="box-container">
          {rentals.length > 0 ? (
            rentals.map((rental) => (
              <div className="box" key={rental.id}>
                <div className="image">
                  <img src={rental.image} alt={rental.product_name} />
                </div>
                <div className="content">
                  <h3>{rental.product_name}</h3>
                  <p>Rental Price: Rs. {rental.rental_price}</p>
                  <p>Total Price: Rs. {rental.total_price}</p>
                  <p>Rental ID: {rental.id}</p>
                  <p>Start Date: {rental.start_date}</p>
                  <p>End Date: {rental.end_date}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No rentals found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rent;
