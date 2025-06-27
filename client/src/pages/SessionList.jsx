import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PrimaryButton from '../components/PrimaryButton';
import '../styles/SessionList.css';

function SessionList({ patientId }) {
  const [sessions, setSessions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get(`/sessions/${patientId}`);
        setSessions(res.data);
      } catch (err) {
        alert('Error loading sessions.');
      }
    };
    fetchSessions();
  }, [patientId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;
    try {
      await API.delete(`/sessions/${id}`);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (err) {
      alert('Error deleting session.');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="session-block">
      <div className="session-list-container">
        <h3>Session History</h3>
        {sessions.length === 0 && <p>No sessions yet.</p>}
        <div className="session-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <span className="session-date">{formatDateTime(session.date)}</span>
              </div>
              <div className="session-notes">
                {expandedId === session.id || session.notes.length < 200 ? (
                  <p>{session.notes}</p>
                ) : (
                  <>
                    <p>{session.notes.slice(0, 200)}...</p>
                    <button className="read-more-btn" onClick={() => toggleExpand(session.id)}>Read more</button>
                  </>
                )}
              </div>
              <div className="session-actions">
                <PrimaryButton onClick={() => handleDelete(session.id)}>Delete</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SessionList;