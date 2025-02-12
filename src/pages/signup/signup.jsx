import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        password_confirm: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        setError(null);

        const userData = {
            name: form.name,
            lastname: form.lastname,
            email: form.email,
            password: form.password,
            password_confirm: form.password_confirm
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Usuário registrado com sucesso!');
                navigate('/home');
            } else {
                const data = await response.json();
                console.error('Erro no registro:', data);
                setError(data.error || 'Erro ao cadastrar.');
            }
        } catch (err) {
            console.error('Erro de conexão:', err);
            setError('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Criar conta - Rotaclassificados</h1>
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="on">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input id="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Sobrenome:</label>
                    <input id="lastname" value={form.lastname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input id="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input id="password" type="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirme sua senha:</label>
                    <input id="password_confirm" type="password" value={form.password_confirm} onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;
