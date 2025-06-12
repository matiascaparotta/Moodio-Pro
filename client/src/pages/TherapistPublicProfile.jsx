import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function TherapistPublicProfile() {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const res = await API.get(`/therapists/${id}`);
        setTherapist(res.data);
      } catch (err) {
        alert('Error loading therapist profile');
      }
    };
    fetchTherapist();
  }, [id]);

  if (!therapist) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '10px' }}>
      <h2>{therapist.fullName}</h2>
      <p><strong>Specialty:</strong> {therapist.specialty}</p>
      <p><strong>Bio:</strong> {therapist.bio}</p>
      {therapist.profileImage && (
        <div style={{ marginBottom: 20 }}>
          <img src={therapist.profileImage} alt="Profile" width="150" style={{ borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
}

export default TherapistPublicProfile;