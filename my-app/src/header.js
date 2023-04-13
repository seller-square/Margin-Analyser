import React from 'react';
import './index.css';
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Company Logo" />
      </div>
      <nav className="nav">
        <ul className="social-media">
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
          <li><a href="#"><i className="fab fa-facebook"></i></a></li>
          <li><a href="#"><i className="fab fa-youtube"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fas fa-envelope"></i></a></li>
        </ul>
        <button className="cta">Call Us</button>
      </nav>
    </header>
  );
}

export default Header;
