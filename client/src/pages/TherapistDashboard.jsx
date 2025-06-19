import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

function TherapistDashboard() {
  const [profile, setProfile] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get('/profile');
        setProfile(profileRes.data);
        const patientsRes = await API.get('/patients');
        setPatients(patientsRes.data);
      } catch (err) {
        alert('Error loading dashboard');
      }
    };
    fetchData();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2 style={{ color: 'var(--blue)', marginBottom: '20px', textAlign: 'center' }}>
        Welcome, {profile.fullName}
      </h2>

      {/* TARJETA DE PERFIL CON IMAGEN A LA IZQUIERDA */}
      <div className="profile-card">
        {profile.profileImage && (
          <img src={profile.profileImage} alt="Profile" />
        )}
        <div className="profile-info">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>

      {/* LISTA DE PACIENTES */}
      <div>
        <h3 style={{ color: 'var(--blue)' }}>Your Patients</h3>
        {patients.length === 0 && <p>No patients yet.</p>}
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {patients.map(patient => (
            <li key={patient.id} style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '12px',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 0 5px rgba(0,0,0,0.1)'
            }}>
              <div>{patient.firstName} {patient.lastName} ({patient.birthYear})</div>
              <Link to={`/patients/${patient.id}`}>
                <PrimaryButton>View</PrimaryButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TherapistDashboard;