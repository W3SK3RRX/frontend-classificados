import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Arquivo de configuração da API

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Token encontrado:', token); // Verifica se o token existe
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          const response = await api.get('/users/minimal_me/');
          console.log('Resposta da API:', response.data);
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao carregar usuário:', error.response?.data || error.message);
          logout();
        }
      } else {
        console.log('Nenhum token encontrado.');
      }
      setLoading(false);
    };

    loadUser();
  }, []);



  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login/', { email, password });
      const { access, user: userData } = response.data; // Supondo que o backend retorna "access"
      localStorage.setItem('token', access);
      api.defaults.headers.Authorization = `Bearer ${access}`;
      setUser(userData);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      throw error;
    }
  };


  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      try {
        // Envia o refresh token para a API de logout
        await api.post('/logout/', { refresh: refreshToken });
        // Remove os tokens do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        api.defaults.headers.Authorization = null; // Remove o token do header
        setUser(null);
        navigate('/login');
      } catch (error) {
        console.error('Erro ao realizar logout:', error.response?.data || error.message);
      }
    } else {
      // Caso não haja o refresh token, realiza o logout normalmente
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);