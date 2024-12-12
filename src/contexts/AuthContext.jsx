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
        api.defaults.headers.Authorization = `Bearer ${token}`; // Configura o token
        try {
          const response = await api.get('/users/me/');
          if (response.status === 200) {
            setUser(response.data); // Popula o estado com os dados do usuário
          } else {
            logout(); // Se não conseguir pegar os dados do usuário, faça logout
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          logout();
        }
      }
      setLoading(false); // Deixe de carregar quando terminar a verificação
    };

    loadUser();
  }, []);


  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login/', { email, password });
      const { token, user: userData } = response.data; // Supondo que o backend retorna `user`
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`; // Configura o token
      setUser(userData); // Atualiza o estado com os dados completos do usuário
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null; // Remove o token
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);