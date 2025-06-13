import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await API.get('/patients');
        const p = res.data.find(p => p.id === parseInt(id));
        setPatient(p);
      } catch (err) {
        alert('Error loading patient');
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '30px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: 'var(--blue)', marginBottom: '20px' }}>
        {patient.firstName} {patient.lastName}
      </h2>

      {patient.profileImage && (
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <img src={patient.profileImage} alt="Profile" width="180" style={{ borderRadius: '12px' }} />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}><strong>Birth Year:</strong> {patient.birthYear}</div>
      <div style={{ marginBottom: '10px' }}><strong>Gender:</strong> {patient.gender || 'N/A'}</div>
      <div style={{ marginBottom: '10px' }}><strong>Conditions:</strong> {patient.existingConditions || 'N/A'}</div>
      <div style={{ marginBottom: '10px' }}><strong>Medications:</strong> {patient.currentMedications || 'N/A'}</div>
      <div style={{ marginBottom: '10px' }}><strong>Goals:</strong> {patient.treatmentGoals || 'N/A'}</div>
      <div style={{ marginBottom: '20px' }}><strong>Notes:</strong> {patient.notes || 'N/A'}</div>

      <Link to={`/patients/${patient.id}/sessions`}>
        <PrimaryButton>View Sessions</PrimaryButton>
      </Link>
    </div>
  );
}

export default PatientDetail;