import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';
import { FaTrash } from 'react-icons/fa';
import '../styles/PatientList.css';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      <h2 className="page-title">Your Patients</h2>
      {loading && <p>Loading patients...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && patients.length === 0 && <p>No patients yet.</p>}

      <div className="patient-list">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div
              className="patient-info-box clickable"
              onClick={() => navigate(`/patients/${patient.id}`)}
              title="View Profile"
            >
              {patient.profileImage && (
                <img
                  src={patient.profileImage}
                  alt="Profile"
                  className="patient-avatar"
                />
              )}
              <div className="patient-name-box">
                <p className="patient-name">{patient.firstName} {patient.lastName}</p>
                <p className="patient-meta">({patient.birthYear})</p>
              </div>
            </div>

            <div className="patient-actions">
              <Link to={`/patients/${patient.id}/sessions`}>
                <PrimaryButton>Sessions</PrimaryButton>
              </Link>
              <button onClick={() => handleDelete(patient.id)} className="delete-btn" title="Delete patient">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;