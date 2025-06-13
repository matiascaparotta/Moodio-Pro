import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpiamos error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación frontend básica
    if (!form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await API.post('/auth/register', form);
      alert('Registered successfully');
      setForm({ email: '', password: '' }); // Limpiamos form después de registrar
    } catch (err) {
      if (err.response?.data?.message === 'Email already in use') {
        setError('This email is already registered.');
      } else {
        setError('Error registering. Please try again.');
      }
    }
  };

  return (
    <FormContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PrimaryButton type="submit">Register</PrimaryButton>
      </form>
    </FormContainer>
  );
}

export default Register;