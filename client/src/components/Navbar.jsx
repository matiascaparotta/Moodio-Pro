import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout, getToken } from '../services/auth';

function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/" className="logo-link">Moodio Pro</Link>
      </h2>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-patient">Add Patient</Link>
            <Link to="/patients">Patients</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;