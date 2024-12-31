import React from 'react';
import '../styles/user.css';  // Adjust the path as needed
import '@fortawesome/fontawesome-free/css/all.min.css';  // Font Awesome
import 'remixicon/fonts/remixicon.css';  // Remix Icons

const reviews = [
  {
    stars: 5,
    title: "Amazing Quality!",
    content: "I recently ordered a dress from this boutique, and I’m in love! The fabric is so soft. I received so many compliments at the event I wore it to. Highly recommend!",
    user: "Sakshi Thorat"
  },
  {
    stars: 5,
    title: "Fast Shipping!",
    content: "I was pleasantly surprised by how quickly my order arrived. The packaging was adorable, and the clothes were just as described. Will definitely be shopping here again!",
    user: "Harshada Borate"
  },
  {
    stars: 4,
    title: "Cute Styles!",
    content: "I love the unique styles this boutique offers, but the sizing was a bit off for me. I had to return a couple of items, but the return process was straightforward.",
    user: "Siya Patil"
  }
];

const Review = () => {
  return (
    <section className="review" id="review">
      <h1 className="heading"> Customer's <span>review</span> </h1>
      <div className="box-container">
        {reviews.map((review, index) => (
          <div className="box" key={index}>
            <div className="stars">
              {[...Array(review.stars)].map((star, i) => (
                <i className="fas fa-star" key={i}></i>
              ))}
            </div>
            <p><b>{review.title}</b><br />{review.content}</p>
            <div className="user">
              {/* Uncomment and adjust the path if images are available */}
              {/* <img src="path/to/user/image.jpg" alt="" /> */}
              <div className="user-info">
                <h3>{review.user}</h3>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
