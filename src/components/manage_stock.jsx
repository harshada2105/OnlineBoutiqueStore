import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import '../styles/admin_style.css';  // Adjust the path as needed

const ManageStock = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdateStock = async (productId, newStock) => {
    try {
      await axios.post('/api/update_stock', { product_id: productId, stock: newStock });
      alert('Stock updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error: Unable to update stock.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AdminHeader />
      <section className="manage-stock">
        <h1 className="heading">Manage <span>Stock</span></h1>
        <div className="box-container">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Current Stock</th>
                <th>New Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const newStock = e.target.stock.value;
                        handleUpdateStock(product.id, newStock);
                      }}
                    >
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td><input type="number" name="stock" min="0" required /></td>
                      <td><button type="submit">Update</button></td>
                    </form>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageStock;
