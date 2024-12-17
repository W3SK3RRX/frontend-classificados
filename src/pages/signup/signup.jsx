import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [form, setForm] = useState({ name: '', lastname: '', email: '', password: '', password_confirm: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8; // Exige pelo menos 8 caracteres
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificações dos dados
        if (!form.name || !form.lastname || !form.email || !form.password || !form.password_confirm) {
            setError('Todos os campos devem ser preenchidos.');
            return;
        }

        if (!validateEmail(form.email)) {
            setError('Insira um e-mail válido.');
            return;
        }

        if (!validatePassword(form.password)) {
            setError('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (form.password !== form.password_confirm) {
            setError('As senhas não correspondem.');
            return;
        }

        setError(null); // Limpa os erros antes de enviar os dados

        try {
            const response = await fetch('http://127.0.0.1:8000/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.error || 'Erro ao cadastrar.');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Criar conta - Rotaclassificados</h1>
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="on">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Sobrenome:</label>
                    <input
                        id="lastname"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        type="email"
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirme sua senha:</label>
                    <input
                        id="password_confirm"
                        name="password_confirm"
                        value={form.password_confirm}
                        onChange={handleChange}
                        required
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;
