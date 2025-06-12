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
      <h2>Welcome, {profile.fullName}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Specialty:</strong> {profile.specialty}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      {profile.profileImage && (
        <div style={{ marginBottom: 20 }}>
          <img src={profile.profileImage} alt="Profile" width="150" style={{ borderRadius: '10px' }} />
        </div>
      )}

      <h3>Your Patients</h3>
      {patients.length === 0 && <p>No patients yet.</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {patients.map(patient => (
          <li key={patient.id} style={{ marginBottom: '15px' }}>
            {patient.firstName} {patient.lastName} ({patient.birthYear}) 
            <Link to={`/patients/${patient.id}`}>
              <PrimaryButton style={{ marginLeft: '10px' }}>View</PrimaryButton>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TherapistDashboard;