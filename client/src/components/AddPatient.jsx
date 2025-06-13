import React, { useState } from 'react';
import API from '../services/api';
import '../styles/global.css';
import PrimaryButton from '../components/PrimaryButton';

function AddPatient() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthYear: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/patients', form);
      alert('Patient created successfully!');
      setForm({ firstName: '', lastName: '', birthYear: '' });
    } catch (err) {
      console.error(err);
      alert('Error creating patient.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '50px auto',
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: 'var(--blue)', marginBottom: '20px' }}>Add New Patient</h2>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Birth Year:</label>
          <input
            type="number"
            name="birthYear"
            placeholder="Birth Year"
            value={form.birthYear}
            onChange={handleChange}
            required
          />
        </div>

        <PrimaryButton type="submit">Create Patient</PrimaryButton>
      </form>
    </div>
  );
}

export default AddPatient;