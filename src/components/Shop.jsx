import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css';  // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'remixicon/fonts/remixicon.css';  // Remix Icons

const Shop = () => {
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

  const toggleDescription = (index) => {
    const newProducts = [...products];
    newProducts[index].showDescription = !newProducts[index].showDescription;
    setProducts(newProducts);
  };

  const checkStock = (stock) => {
    if (stock <= 0) {
      alert('Sorry, product is out of stock.');
      return false;
    }
    return true;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="shop" id="shop">
      <div className="box-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="box" key={product.id}>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <p>
                  Available Sizes:
                  <select>
                    {product.sizes.split(',').map((size, i) => (
                      <option key={i} value={size}>{size}</option>
                    ))}
                  </select>
                </p>
                <div className="price">Rs. {product.rental_price} <span>{product.stock > 0 ? 'In Stock' : <span style={{color: 'red'}}>Out of Stock</span>}</span></div>
                <button className="toggle-btn" onClick={() => toggleDescription(index)}>{product.showDescription ? 'Less Info' : 'More Info'}</button>
                <div className="description" style={{ display: product.showDescription ? 'block' : 'none' }}>
                  <p>{product.description}</p>
                </div>
                <div className="buttons">
                  <form method="POST" action="/add_to_wishlist">
                    <input type="hidden" name="product_id" value={product.id} />
                    <button type="submit" className="cart-btn">Add to Wishlist</button>
                  </form>
                  <form method="POST" action="/process_rent" onSubmit={() => checkStock(product.stock)}>
                    <input type="hidden" name="product_id" value={product.id} />
                    <select name="size" required>
                      {product.sizes.split(',').map((size, i) => (
                        <option key={i} value={size}>{size}</option>
                      ))}
                    </select>
                    <button type="submit" className="rent-btn" disabled={product.stock <= 0}>Buy on rent</button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
};

export default Shop;
