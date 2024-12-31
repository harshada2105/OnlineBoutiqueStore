import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import '../styles/admin_style.css';  // Adjust the path as needed

const ManageProducts = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    rental_price: '',
    image: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Verify admin role
        const roleResponse = await axios.get(`/api/verify_admin/${userId}`);
        if (roleResponse.data.role !== 'admin') {
          alert('Access denied!');
          navigate('/login');
          return;
        }

        // Fetch products
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
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/add_product', productForm);
      alert('Product added successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error: Unable to add product.');
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios.post('/api/update_product', { ...productForm, product_id: productId });
      alert('Product updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error: Unable to update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post('/api/delete_product', { product_id: productId });
      alert('Product deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error: Unable to delete product.');
    }
  };

  const showUpdateForm = (product) => {
    setProductForm(product);
    setShowAddForm(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <AdminHeader />
      <section className="manage-products">
        <h2 className="heading">Manage Products</h2>
        <button className="add-product-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Product'}
        </button>
        {showAddForm && (
          <div id="add-form">
            <form onSubmit={handleAddProduct}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={productForm.name} onChange={handleChange} required /><br />
              <label htmlFor="description">Description:</label>
              <textarea name="description" value={productForm.description} onChange={handleChange} required></textarea><br />
              <label htmlFor="price">Price:</label>
              <input type="number" step="0.01" name="price" value={productForm.price} onChange={handleChange} required /><br />
              <label htmlFor="rental_price">Rental Price:</label>
              <input type="number" step="0.01" name="rental_price" value={productForm.rental_price} onChange={handleChange} required /><br />
              <label htmlFor="image">Image:</label>
              <input type="text" name="image" value={productForm.image} onChange={handleChange} required /><br />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rental Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.rental_price}</td>
                  <td><img src={`../${product.image}`} alt={product.name} width="50" /></td>
                  <td>
                    <button onClick={() => showUpdateForm(product)}>Update</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
        {productForm.id && (
          <div id="update-form">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProduct(productForm.id);
            }}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={productForm.name} onChange={handleChange} required /><br />
              <label htmlFor="description">Description:</label>
              <textarea name="description" value={productForm.description} onChange={handleChange} required></textarea><br />
              <label htmlFor="price">Price:</label>
              <input type="number" step="0.01" name="price" value={productForm.price} onChange={handleChange} required /><br />
              <label htmlFor="rental_price">Rental Price:</label>
              <input type="number" step="0.01" name="rental_price" value={productForm.rental_price} onChange={handleChange} required /><br />
              <label htmlFor="image">Image:</label>
              <input type="text" name="image" value={productForm.image} onChange={handleChange} required /><br />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default ManageProducts;
