import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // create this for styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Feed Optimiser</div>
      <div className="navbar-links">
        <Link to="/likes">Calculator</Link>
      </div>
    </nav>
  );
}
