import React from 'react';
import '../assets/images/banner1.jpg';  // Import the image
import '../styles/user.css';  // Import the user CSS file

const Home = () => {
  return (
    <div>
      <section className="home" id="home">
        <div className="content">
          <h3>Trendy Clothes</h3>
          <span>Trendy clothes to exceed your mental limits!</span>
          <p>Find the look you're looking for without buying it!</p>
          <a href="shop.php" className="btn">Shop Now</a>
        </div>
        <img src={require('../assets/images/banner1.jpg')} alt="Trendy Clothes" />
      </section>
    </div>
  );
};

export default Home;
