import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL base da sua API
});

// Intercepta solicitações para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Recupera o token do armazenamento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (email, password) => {
  return api.post('/users/login/', { email, password });
};

export const register = (data) => {
  return api.post('/users/register/', data);
};

export default api;
