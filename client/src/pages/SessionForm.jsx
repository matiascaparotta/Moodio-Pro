import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import API from '../services/api';
import '../styles/SessionForm.css';

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
      if (onSessionCreated) onSessionCreated();
    } catch (err) {
      console.error(err);
      alert('Error creating session.');
    }
  };

  return (
    <div className="session-block">
      <div className="session-form-container">
        <h2 className="session-title">New Session</h2>
        <form onSubmit={handleSubmit} className="session-form">
          <InputField label="Date" type="date" name="date" value={form.date} onChange={handleChange} required />

          <div className="textarea-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Write session notes here..."
            />
          </div>

          <div className="session-button">
            <PrimaryButton type="submit">Save Session</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SessionForm;