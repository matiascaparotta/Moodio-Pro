import React, { useEffect, useState } from 'react';
import API from '../services/api';
import SessionForm from './SessionForm';
import SessionList from './SessionList';
import { useParams } from 'react-router-dom';

function PatientSessions() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await API.get('/patients');
        const p = res.data.find(p => p.id === parseInt(patientId));
        setPatient(p);
      } catch (err) {
        alert('Error loading patient.');
      }
    };
    fetchPatient();
  }, [patientId]);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
    
      <SessionForm patientId={patientId} onSessionCreated={() => window.location.reload()} />
      <SessionList patientId={patientId} />
    </div>
  );
}

export default PatientSessions;