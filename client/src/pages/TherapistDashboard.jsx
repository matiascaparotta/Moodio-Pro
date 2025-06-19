import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import '../styles/Dashboard.css';

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
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Welcome, {profile.fullName}
      </h2>

      <div className="dashboard-profile-card">
        {profile.profileImage && (
          <img src={profile.profileImage} alt="Profile" className="profile-avatar" />
        )}
        <div className="profile-details">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Specialty:</strong> {profile.specialty}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>

      <div className="dashboard-patients-section">
        <div className="dashboard-patients-header">
          <h3 className="dashboard-subtitle">Your Patients</h3>
          <Link to="/create-patient">
            <PrimaryButton>Add New Patient</PrimaryButton>
          </Link>
        </div>

        {patients.length === 0 && <p>No patients yet.</p>}

        <ul className="patient-list">
          {patients.map(patient => (
            <li key={patient.id} className="patient-card">
              <div className="patient-info-box">
                {patient.profileImage && (
                  <img src={patient.profileImage} alt="Patient" className="patient-avatar" />
                )}
                <div>
                  <p className="patient-name">{patient.firstName} {patient.lastName}</p>
                  <p className="patient-meta">Born: {patient.birthYear}</p>
                </div>
              </div>
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