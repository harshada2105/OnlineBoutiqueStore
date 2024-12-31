import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import '../styles/admin_style.css';  // Adjust the path as needed

const ViewRentals = ({ userId }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = userId ? 
          await axios.get(`/api/rentals?user_id=${userId}`) : 
          await axios.get('/api/rentals');
        setRentals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        setError('Error fetching rentals.');
        setLoading(false);
      }
    };
    fetchRentals();
  }, [userId]);

  const handleMarkAsReturned = async (rentalId) => {
    try {
      await axios.post('/api/update_return_status', { rental_id: rentalId });
      alert('Rental marked as returned successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Error: Unable to update return status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AdminHeader />
      <section className="view-rentals">
        <h1 className="heading">{userId ? `Rental History for User ID: ${userId}` : 'All Rentals'}</h1>
        <div className="box-container">
          <table>
            <thead>
              <tr>
                <th>Rental ID</th>
                <th>Product Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rental Price</th>
                <th>Total Price</th>
                <th>Returned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.length > 0 ? (
                rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td>{rental.id}</td>
                    <td>{rental.product_name}</td>
                    <td>{rental.start_date}</td>
                    <td>{rental.end_date}</td>
                    <td>Rs. {rental.rental_price}</td>
                    <td>Rs. {rental.total_price}</td>
                    <td>{rental.returned ? 'Yes' : 'No'}</td>
                    <td>
                      <button 
                        onClick={() => handleMarkAsReturned(rental.id)} 
                        disabled={rental.returned}
                      >
                        Mark as Returned
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No rentals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ViewRentals;
