import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  withCredentials: true // 🔑 importantísimo para Safari y móvil
});

// Interceptor para agregar token si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('TOKEN ENVIADO EN HEADER ===>', token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default API;