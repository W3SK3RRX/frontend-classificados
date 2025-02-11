import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './payments.css';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get('plan_id');

    const [plan, setPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Buscar detalhes do plano com base no plan_id
    useEffect(() => {
        if (!planId) {
            navigate('/signup'); // Se não houver plano, redireciona para o cadastro
            return;
        }

        fetch(`http://127.0.0.1:8000/plans/${planId}/`)
            .then(response => response.json())
            .then(data => setPlan(data))
            .catch(() => setError('Erro ao carregar os detalhes do plano.'));
    }, [planId, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Simulação de pagamento aprovado
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Criar assinatura no backend
            const response = await fetch('http://127.0.0.1:8000/subscriptions/create_subscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ plan_id: plan.id })
            });
            

            if (!response.ok) {
                throw new Error('Erro ao criar assinatura');
            }

            alert('Pagamento aprovado e assinatura criada!');
            navigate('/home');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="payment-container">
            <h1>Pagamento</h1>
            {plan ? (
                <>
                    <p><strong>Plano escolhido:</strong> {plan.name} - R$ {plan.price}</p>
                    <form className="payment-form" onSubmit={handlePayment}>
                        <label>Método de Pagamento:</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="credit_card">Cartão de Crédito</option>
                            <option value="pix">Pix</option>
                            <option value="boleto">Boleto</option>
                        </select>
                        {paymentMethod === 'credit_card' && (
                            <div>
                                <label>Número do Cartão:</label>
                                <input type="text" value={cardInfo.cardNumber} onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })} required />
                                <label>Validade:</label>
                                <input type="text" value={cardInfo.expiry} onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} required />
                                <label>CVV:</label>
                                <input type="text" value={cardInfo.cvv} onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })} required />
                            </div>
                        )}
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="pay-button" disabled={loading}>{loading ? 'Processando...' : 'Pagar'}</button>
                    </form>
                </>
            ) : (
                <p>Carregando detalhes do plano...</p>
            )}
        </div>
    );
}

export default Payment;
