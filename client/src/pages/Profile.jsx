import React, { useEffect, useState } from 'react';
import API from '../services/api';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

function Profile() {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    bio: '',
    specialty: '',
    profileImage: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/profile');
        setProfile(res.data);
      } catch (err) {
        alert('Error loading profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/profile', profile);
      alert('Profile updated');
    } catch (err) {
      alert('Error updating profile');
    }
  };

  return (
    <FormContainer>
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Full Name" name="fullName" value={profile.fullName || ''} onChange={handleChange} type="text" />
        <InputField label="Specialty" name="specialty" value={profile.specialty || ''} onChange={handleChange} type="text" />
        <InputField label="Bio" name="bio" value={profile.bio || ''} onChange={handleChange} type="text" />
        <InputField label="Profile Image URL" name="profileImage" value={profile.profileImage || ''} onChange={handleChange} type="text" />
        {profile.profileImage && (
          <div style={{ marginBottom: '20px' }}>
            <img src={profile.profileImage} alt="Profile" width="100" height="100" style={{ borderRadius: '50%' }} />
          </div>
        )}
        <PrimaryButton type="submit">Save</PrimaryButton>
      </form>
    </FormContainer>
  );
}

export default Profile;