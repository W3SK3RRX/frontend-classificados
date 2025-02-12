import React, { useState, useEffect } from 'react';
import { Card, Button, Loader } from 'rsuite';
import './Card_group.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

function Card_group({ buttonText }) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/plans/')
            .then(response => {
                setPlans(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Erro ao carregar os planos.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader size="lg" center />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Função para redirecionar para a página de pagamento
    const handleSubscribe = (planId) => {
        navigate(`/pagamento?plan_id=${planId}`);
    };

    return (
        <div className="card-group-container">
            {plans.length > 0 ? (
                plans.map(plan => (
                    <Card className="card-group-card" size="lg" key={plan.id}>
                        <Card.Header className="card-group-card-header">{plan.name}</Card.Header>
                        <Card.Body className="card-group-card-body">
                            <p className="plan-description">{plan.description}</p>
                            <div className="card-group-card-price">Preço: R$ {plan.price}</div>
                            <div className="card-group-card-duration">
                                Duração: {plan.duration_in_days} dias
                            </div>
                        </Card.Body>
                        <Card.Footer className="card-group-card-footer">
                            <Button
                                className="card-group-card-button"
                                appearance="primary"
                                onClick={() => handleSubscribe(plan.id)} // Chama a função com o ID do plano
                            >
                                {buttonText}
                            </Button>
                        </Card.Footer>
                    </Card>
                ))
            ) : (
                <div>Nenhum plano disponível.</div>
            )}
        </div>
    );
}

export default Card_group;
