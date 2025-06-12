import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import API from '../services/api';

function SessionForm({ patientId, onSessionCreated }) {
  const [form, setForm] = useState({ date: '', notes: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/sessions', { ...form, patientId });
      alert('Session created');
      setForm({ date: '', notes: '' });
      if (onSessionCreated) onSessionCreated(); // Refresh parent
    } catch (err) {
      alert('Error creating session.');
    }
  };

  return (
    <FormContainer>
      <h2>New Session</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Date" type="date" name="date" value={form.date} onChange={handleChange} />
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <PrimaryButton type="submit">Save Session</PrimaryButton>
      </form>
    </FormContainer>
  );
}

export default SessionForm;