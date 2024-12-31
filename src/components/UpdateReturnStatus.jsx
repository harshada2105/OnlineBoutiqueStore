import React from 'react';
import axios from 'axios';

const UpdateReturnStatus = ({ rentalId, userId }) => {
  const handleUpdate = async () => {
    try {
      await axios.post('/api/update_return_status', { rental_id: rentalId, user_id: userId });
      alert('Rental marked as returned successfully!');
      window.location.href = '/view_rentals';  // Redirect to the view rentals page
    } catch (error) {
      console.error('Error updating return status:', error);
      alert('Error: Unable to update return status.');
    }
  };

  return (
    <button onClick={handleUpdate}>Mark as Returned</button>
  );
};

export default UpdateReturnStatus;
