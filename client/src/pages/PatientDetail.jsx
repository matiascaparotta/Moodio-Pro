import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';
import '../styles/PatientDetail.css';

function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [originalPatient, setOriginalPatient] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await API.get(`/patients/${id}`);
        setPatient(res.data);
        setOriginalPatient(res.data);
      } catch (err) {
        alert('Error loading patient');
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await API.put(`/patients/${id}`, patient);
      alert('Patient updated');
      setEditing(false);
      setOriginalPatient(patient);
    } catch (err) {
      alert('Error updating patient');
    }
  };

  const handleCancel = () => {
    setPatient(originalPatient);
    setEditing(false);
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="container patient-detail">
      <h2 className="page-title">{patient.firstName} {patient.lastName}</h2>

      {patient.profileImage && (
        <div className="patient-image">
          <img src={patient.profileImage} alt="Profile" />
        </div>
      )}

      <div className="patient-info">
        {editing && (
          <>
            <label>Image URL:</label>
            <input
              name="profileImage"
              value={patient.profileImage || ''}
              onChange={handleChange}
            />
          </>
        )}

        <label>Gender:</label>
        {editing ? (
          <input name="gender" value={patient.gender || ''} onChange={handleChange} />
        ) : (
          <p>{patient.gender}</p>
        )}

        <label>Birth Year:</label>
        {editing ? (
          <input name="birthYear" value={patient.birthYear || ''} onChange={handleChange} />
        ) : (
          <p>{patient.birthYear}</p>
        )}

        <label>Conditions:</label>
        {editing ? (
          <input name="existingConditions" value={patient.existingConditions || ''} onChange={handleChange} />
        ) : (
          <p>{patient.existingConditions || 'N/A'}</p>
        )}

        <label>Medications:</label>
        {editing ? (
          <input name="currentMedications" value={patient.currentMedications || ''} onChange={handleChange} />
        ) : (
          <p>{patient.currentMedications || 'N/A'}</p>
        )}

        <label>Goals:</label>
        {editing ? (
          <input name="treatmentGoals" value={patient.treatmentGoals || ''} onChange={handleChange} />
        ) : (
          <p>{patient.treatmentGoals || 'N/A'}</p>
        )}

        <label>Notes:</label>
        {editing ? (
          <input name="notes" value={patient.notes || ''} onChange={handleChange} />
        ) : (
          <p>{patient.notes || 'N/A'}</p>
        )}
      </div>

      <div className="button-group">
        {editing ? (
          <>
            <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            <PrimaryButton onClick={handleCancel}>Cancel</PrimaryButton>
          </>
        ) : (
          <PrimaryButton onClick={() => setEditing(true)}>Edit</PrimaryButton>
        )}
        <Link to={`/patients/${patient.id}/sessions`}>
          <PrimaryButton>View Sessions</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

export default PatientDetail;