import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get('/patients');
        setPatients(res.data);
      } catch (err) {
        alert('Error loading patients');
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/patients/${id}`);
      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      alert('Error deleting patient');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      maxWidth: '900px',
      margin: '40px auto'
    }}>
      <h2>Patient List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Birth Year</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={tdStyle}>{patient.firstName}</td>
              <td style={tdStyle}>{patient.lastName}</td>
              <td style={tdStyle}>{patient.birthYear}</td>
              <td style={tdStyle}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <PrimaryButton onClick={() => handleDelete(patient.id)}>Delete</PrimaryButton>

                  {/* 👉 Nueva acción: ir al detalle del paciente */}
                  <Link to={`/patients/${patient.id}`}>
                    <PrimaryButton>Profile</PrimaryButton>
                  </Link>

                  {/* 👉 Acción a historial de sesiones */}
                  <Link to={`/patients/${patient.id}/sessions`}>
                    <PrimaryButton>Sessions</PrimaryButton>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { textAlign: 'left', padding: '10px', borderBottom: '1px solid #ddd' };
const tdStyle = { padding: '10px', borderBottom: '1px solid #eee' };

export default PatientList;