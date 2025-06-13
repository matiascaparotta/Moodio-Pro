import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import './Home.css';  // Te preparo estilos también

function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Moodio Pro</h1>
        <p>Emotional Health Platform for Therapists & Coaches</p>
        <div className="button-group">
          <Link to="/login">
            <PrimaryButton>Login</PrimaryButton>
          </Link>
          <Link to="/register">
            <PrimaryButton>Register</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;