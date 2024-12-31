import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/user.css';  // Adjust the path as needed

const RentalReceipt = () => {
  const { rentalId } = useParams();  // Get rental ID from URL parameters
  const navigate = useNavigate();
  const [rental, setRental] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const response = await axios.get(`/api/rental/${rentalId}`);
        setRental(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rental details:', error);
        setError('Error fetching rental details.');
        setLoading(false);
      }
    };
    fetchRentalDetails();
  }, [rentalId]);

  const downloadReceipt = () => {
    window.print();
    setTimeout(() => navigate('/rent'), 2000);  // Redirect to rental history after printing
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="receipt">
      <h1>Rental Receipt</h1>
      <div className="details">
        <p><strong>Rental ID:</strong> {rental.id}</p>
        <p><strong>User Name:</strong> {rental.username}</p>
        <p><strong>Phone Number:</strong> {rental.phone}</p>
        <p><strong>Product Name:</strong> {rental.product_name}</p>
      </div>
      <div className="details">
        <p><strong>Rental Price:</strong> Rs. {rental.rental_price}</p>
        <p><strong>Total Price:</strong> Rs. {rental.total_price}</p>
        <p><strong>Start Date:</strong> {rental.start_date}</p>
        <p><strong>End Date:</strong> {rental.end_date}</p>
      </div>
      <div className="address">
        <p><strong>Delivery Address:</strong> {rental.address}</p>
      </div>
      <div className="thankyou">
        <p>Thank you for renting with us. We hope you enjoy your rental!</p>
      </div>
      <button className="download-btn" onClick={downloadReceipt}>Download as PDF</button>
    </div>
  );
};

export default RentalReceipt;
