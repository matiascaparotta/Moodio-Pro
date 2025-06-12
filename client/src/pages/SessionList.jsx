import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';

function SessionList({ patientId }) {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const res = await API.get(`/sessions/${patientId}`);
      setSessions(res.data);
    } catch (err) {
      alert('Error loading sessions.');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [patientId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/sessions/${id}`);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (err) {
      alert('Error deleting session.');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      marginTop: '20px'
    }}>
      <h3>Session History</h3>
      {sessions.length === 0 && <p>No sessions yet.</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sessions.map((session) => (
          <li key={session.id} style={{ marginBottom: 15 }}>
            <div><strong>Date:</strong> {session.date.slice(0, 10)}</div>
            <div><strong>Notes:</strong> {session.notes}</div>
            <PrimaryButton onClick={() => handleDelete(session.id)} style={{ marginTop: 10 }}>Delete</PrimaryButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionList;