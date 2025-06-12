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
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '10px' }}>
      <h2>{patient.firstName} {patient.lastName}</h2>
      <p><strong>Birth Year:</strong> {patient.birthYear}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Conditions:</strong> {patient.existingConditions}</p>
      <p><strong>Medications:</strong> {patient.currentMedications}</p>
      <p><strong>Goals:</strong> {patient.treatmentGoals}</p>
      <p><strong>Notes:</strong> {patient.notes}</p>
      {patient.profileImage && (
        <div style={{ marginBottom: 20 }}>
          <img src={patient.profileImage} alt="Profile" width="150" height="150" style={{ borderRadius: '10px' }} />
        </div>
      )}
      <Link to={`/patients/${patient.id}/sessions`}>
        <PrimaryButton>View Sessions</PrimaryButton>
      </Link>
    </div>
  );
}

export default PatientDetail;