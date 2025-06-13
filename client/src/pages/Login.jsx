import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import API from '../services/api';
import { saveToken } from '../services/auth';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const res = await API.post('/auth/login', form);
      saveToken(res.data.token);
      navigate('/dashboard');  // ✅ Redirigimos al Dashboard
    } catch (err) {
      if (err.response?.data?.message === 'User not found') {
        setError('User not found.');
      } else if (err.response?.data?.message === 'Invalid credentials') {
        setError('Incorrect password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <FormContainer>
      <h2 style={{ marginBottom: '30px', color: 'var(--blue)' }}>Moodio Pro</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <PrimaryButton type="submit">Login</PrimaryButton>
      </form>
    </FormContainer>
  );
}

export default Login;