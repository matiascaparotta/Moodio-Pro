import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import API from '../services/api';

function PatientForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthYear: '',
    gender: 'male',
    profileImage: '',
    existingConditions: '',
    currentMedications: '',
    treatmentGoals: '',
    notes: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de los campos obligatorios
    if (!form.firstName || !form.lastName || !form.birthYear) {
      setError('First Name, Last Name and Birth Year are required.');
      return;
    }

    try {
      const res = await API.post('/patients', form);
      alert('Patient created');
      navigate(`/patients/${res.data.id}`);
    } catch (err) {
      console.error(err);
      setError('Error creating patient.');
    }
  };

  return (
    <FormContainer>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="First Name" type="text" name="firstName" value={form.firstName} onChange={handleChange} />
        <InputField label="Last Name" type="text" name="lastName" value={form.lastName} onChange={handleChange} />
        <InputField label="Birth Year" type="number" name="birthYear" value={form.birthYear} onChange={handleChange} />

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <InputField label="Profile Image URL" type="text" name="profileImage" value={form.profileImage} onChange={handleChange} />
        <InputField label="Existing Conditions" type="text" name="existingConditions" value={form.existingConditions} onChange={handleChange} />
        <InputField label="Current Medications" type="text" name="currentMedications" value={form.currentMedications} onChange={handleChange} />
        <InputField label="Treatment Goals" type="text" name="treatmentGoals" value={form.treatmentGoals} onChange={handleChange} />
        <InputField label="Notes" type="text" name="notes" value={form.notes} onChange={handleChange} />

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <PrimaryButton type="submit">Save</PrimaryButton>
      </form>
    </FormContainer>
  );
}

export default PatientForm;