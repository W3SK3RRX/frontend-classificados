import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ajuste o caminho conforme sua estrutura

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Verifica se o usuário está autenticado

    if (loading) {
        return <div>Carregando...</div>; // Exibe uma mensagem de carregamento enquanto a autenticação é verificada
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;