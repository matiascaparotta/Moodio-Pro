import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';
import { FaTrash } from 'react-icons/fa';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get('/patients');
        setPatients(res.data);
      } catch (err) {
        setError('Error loading patients');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await API.delete(`/patients/${id}`);
      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      setError('Error deleting patient');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ color: 'var(--blue)', marginBottom: '30px' }}>Your Patients</h2>

      {loading && <p>Loading patients...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && patients.length === 0 && <p>No patients yet.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {patients.map((patient) => (
          <div key={patient.id} style={cardStyle}>
            <div style={{ position: 'relative', width: '100%' }}>
              <FaTrash 
                onClick={() => handleDelete(patient.id)}
                style={deleteIconStyle}
                title="Delete patient"
              />
              <h3>{patient.firstName} {patient.lastName}</h3>
              <p>Born: {patient.birthYear}</p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to={`/patients/${patient.id}`}><PrimaryButton>Profile</PrimaryButton></Link>
                <Link to={`/patients/${patient.id}/sessions`}><PrimaryButton>Sessions</PrimaryButton></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  position: 'relative'
};

const deleteIconStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#FF6B6B',
  cursor: 'pointer',
  fontSize: '20px'
};

export default PatientList;