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
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ color: 'var(--blue)', marginBottom: '10px' }}>Welcome, {profile.fullName}</h2>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Specialty:</strong> {profile.specialty}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        {profile.profileImage && (
          <div style={{ marginBottom: 20 }}>
            <img src={profile.profileImage} alt="Profile" width="150" style={{ borderRadius: '10px' }} />
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
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