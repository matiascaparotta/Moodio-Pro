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
    <div className="container">
      <h2 style={{ color: 'var(--blue)', marginBottom: '30px' }}>Your Patients</h2>

      {loading && <p>Loading patients...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && patients.length === 0 && <p>No patients yet.</p>}

      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <FaTrash 
              onClick={() => handleDelete(patient.id)}
              className="delete-icon"
              title="Delete patient"
            />
            <h3>{patient.firstName} {patient.lastName}</h3>
            <p>Born: {patient.birthYear}</p>
            <div className="patient-buttons">
              <Link to={`/patients/${patient.id}`}><PrimaryButton>Profile</PrimaryButton></Link>
              <Link to={`/patients/${patient.id}/sessions`}><PrimaryButton>Sessions</PrimaryButton></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;