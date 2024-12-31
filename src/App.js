import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Contact from './components/Contact';
import Logout from './components/Logout';
import Register from './components/Register';
import Shop from './components/Shop';
import Wishlist from './components/Wishlist';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      {isHomePage && <Footer />}
    </div>
  );
}

export default App;
