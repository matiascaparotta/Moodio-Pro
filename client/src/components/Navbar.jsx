import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout, getToken } from '../services/auth';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => { closeMenu(); navigate(token ? '/dashboard' : '/'); }}>
        Moodio Pro
      </h2>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {token ? (
          <>
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            <Link to="/create-patient" onClick={closeMenu}>Add Patient</Link>
            <Link to="/patients" onClick={closeMenu}>Patients</Link>
            <Link to="/profile" onClick={closeMenu}>Profile</Link>
            <button onClick={() => { handleLogout(); closeMenu(); }} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" onClick={closeMenu}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;