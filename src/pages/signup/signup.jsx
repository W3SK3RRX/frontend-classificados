import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [form, setForm] = useState({ name: '', lastname: '', email: '', password: '', password_confirm: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            <h1>Criar Conta</h1>
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="on">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name" // Specifies autofill behavior
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
                        autoComplete="family-name" // Specifies autofill behavior
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
                        autoComplete="email" // Specifies autofill behavior
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
                        autoComplete="new-password" // Ensures the browser knows this is a password field
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
                        autoComplete="new-password" // Same as above
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;
