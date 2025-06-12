import React, { useState } from 'react';
import API from '../services/api';

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
    <div style={{ padding: 20 }}>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        /><br />

        <input
          type="number"
          name="birthYear"
          placeholder="Birth Year"
          value={form.birthYear}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;