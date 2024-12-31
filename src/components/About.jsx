import React from 'react';
import '../assets/images/hannaskhan_1.jpg';  // Import the image
import '../styles/user.css';  // Import the user CSS file

const About = () => {
  return (
    <section className="about" id="about">
      <div className="row">
        <div className="video-container">
          <img src={require('../assets/images/hannaskhan_1.jpg')} alt="Hanna S Khan" />
          <h3>Why choose us?</h3>
        </div>
        <div className="content">
          <p>We hand-pick every item to ensure you get the latest and trendiest styles.</p>
          <p>Enjoy top fashion without breaking the bank.</p>
          <p>Reduce fashion waste by choosing to rent.</p>
          <p>Feel good about looking good.</p>
          <p>Easy browsing and swift delivery right to your doorstep.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
