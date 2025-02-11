import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        password_confirm: '',
        user_type: 'individual',
        plan_id: ''
    });
    const [error, setError] = useState(null);
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Busca os planos de assinatura
        fetch('http://127.0.0.1:8000/plans/')
            .then(response => response.json())
            .then(data => setPlans(data))
            .catch(() => setError('Erro ao carregar os planos de assinatura.'));
    }, []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação de campos obrigatórios
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
        if ((form.user_type === 'professional' || form.user_type === 'company') && !form.plan_id) {
            setError('Profissionais e empresas devem escolher um plano.');
            return;
        }

        setError(null);

        const userData = {
            name: form.name,
            lastname: form.lastname,
            email: form.email,
            user_type: form.user_type,
            password: form.password,
            password_confirm: form.password_confirm,
            plan_id: form.plan_id || null,  // Inclui o plan_id ou null se for 'individual'
        };

        // Log para depuração
        console.log('Dados a serem enviados:', userData);

        try {
            const response = await fetch('http://127.0.0.1:8000/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Usuário registrado com sucesso!');

                // Verifica se o usuário escolheu um plano (profissional ou empresa)
                if (form.user_type === 'professional' || form.user_type === 'company') {
                    navigate(`/pagamento?plan_id=${form.plan_id}`); // Redireciona para pagamento
                } else {
                    navigate('/home'); // Redireciona usuários comuns para o dashboard
                }

            } else {
                const data = await response.json();
                console.error('Erro no registro:', data);  // Logando o erro retornado pelo backend
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
                <div className="form-group">
                    <label htmlFor="user_type">Tipo de Usuário:</label>
                    <select id="user_type" value={form.user_type} onChange={handleChange} required>
                        <option value="individual">Cliente</option>
                        <option value="professional">Profissional</option>
                        <option value="company">Empresa</option>
                    </select>
                </div>
                {(form.user_type === 'professional' || form.user_type === 'company') && (
                    <div className="form-group">
                        <label htmlFor="plan_id">Escolha um plano:</label>
                        <select id="plan_id" value={form.plan_id} onChange={handleChange} required>
                            <option value="">Selecione um plano</option>
                            {plans.map((plan) => (
                                <option key={plan.id} value={plan.id}>{plan.name} - R$ {plan.price}</option>
                            ))}
                        </select>
                    </div>
                )}
                {error && <p className="error">{error}</p>}
                <button type="submit" className="signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;
