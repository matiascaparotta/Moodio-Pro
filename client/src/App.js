import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PatientForm from './pages/PatientForm';
import PatientList from './pages/PatientList';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import './styles/global.css';
import PatientSessions from './pages/PatientSessions';
import Profile from './pages/Profile';
import PatientDetail from './pages/PatientDetail';
import TherapistDashboard from './pages/TherapistDashboard';
import TherapistPublicProfile from './pages/TherapistPublicProfile';
import Home from './pages/Home';  // 👉 NUEVA Home de bienvenida

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />  {/* 👉 Ahora la Home es portada */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-patient" element={<PrivateRoute><PatientForm /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientList /></PrivateRoute>} />
          <Route path="/patients/:patientId/sessions" element={<PrivateRoute><PatientSessions /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><PatientDetail /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><TherapistDashboard /></PrivateRoute>} />
          <Route path="/therapists/:id" element={<TherapistPublicProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;