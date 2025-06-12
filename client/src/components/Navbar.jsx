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
      <h2>Moodio Pro</h2>
      <div className="nav-links">
        {token && (
          <>
            <Link to="/create-patient">Add Patient</Link>
            <Link to="/patients">Patient List</Link>
            <Link to="/profile">My Profile</Link> {/* 👈 Agregamos acceso al perfil */}
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
          </>
        )}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const buttonStyle = {
  marginLeft: '20px',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontWeight: 500,
  cursor: 'pointer'
};

export default Navbar;