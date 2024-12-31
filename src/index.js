import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome
import 'remixicon/fonts/remixicon.css';  // Import Remix Icons

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
