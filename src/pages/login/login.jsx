import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importa o contexto de autenticação

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para mensagens de erro
    const { login } = useAuth(); // Usa o contexto de autenticação

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir comportamento padrão do formulário
        try {
            await login(email, password); // Chama a função de login do contexto
        } catch (err) {
            setError(err.response?.data?.detail || 'Erro ao fazer login'); // Captura mensagens de erro
        }
    };

    return (
        <div className="login-container">
            <h1>Rotaclassificados</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Exibe mensagens de erro */}
                <button type="submit" className="login-button">Entrar</button>
            </form>
            <div className="login-links">
                <Link to="/forgot-password" className="forgot-password">Esqueceu a senha?</Link>
                <p className="no-account">
                    Não possui cadastro? <Link to="/signup">Crie uma conta</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
