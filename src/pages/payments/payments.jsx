import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Content, Footer, Panel, Form, Button, SelectPicker, Loader, Message } from 'rsuite';
import Header from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get('plan_id');

    const [plan, setPlan] = useState(null);
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subscriptionActive, setSubscriptionActive] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(null);

    useEffect(() => {
        if (!planId) {
            navigate('/signup');
            return;
        }

        // Buscar detalhes do plano
        fetch(`http://127.0.0.1:8000/plans/${planId}/`)
            .then(response => response.json())
            .then(data => setPlan(data))
            .catch(() => setError('Erro ao carregar os detalhes do plano.'));

        // Buscar informações do usuário para verificar assinatura
        fetch("http://127.0.0.1:8000/subscriptions/subscription_status/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.active) {
                    const expirationDate = new Date(data.end_date);
                    const today = new Date();
                    const diffTime = expirationDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte milissegundos para dias

                    setSubscriptionActive(true);
                    setDaysRemaining(diffDays);
                    setUser(data);
                }
            })
            .catch(error => console.error("Erro ao buscar assinatura:", error));
    }, []);

    const handlePayment = async (e) => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        }

        setError(null);
        setLoading(true);

        try {
            console.log("Enviando requisição para assinatura...");
            console.log("Plan ID:", plan.id);

            const response = await fetch("http://127.0.0.1:8000/subscriptions/create_subscription/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ plan_id: plan.id }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error) {
                    if (data.error.includes("assinatura ativa") && daysRemaining !== null) {
                        setSubscriptionActive(true);
                        setError(`Você já possui uma assinatura ativa. Faltam ${daysRemaining} ${daysRemaining === 1 ? "dia" : "dias"} para expirar.`);
                    } else {
                        setError(data.error);
                    }
                } else {
                    throw new Error("Erro ao criar assinatura.");
                }
            } else {
                alert("Pagamento aprovado e assinatura criada!");
                navigate("/home");
            }
        } catch (error) {
            console.error("Erro no pagamento:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Header />
            <Content className="container-content content-spacing">
                {error && <Message showIcon type="error">{error}</Message>}
                <br />
                <Panel header="Pagamento" bordered className="payment-panel">
                    {plan ? (
                        <>
                            <p><strong>Plano escolhido:</strong> {plan.name} - R$ {plan.price}</p>
                            <br />
                            {subscriptionActive && daysRemaining !== null && (
                                <Message showIcon type="warning">
                                    <strong>Atenção!</strong> Você já tem uma assinatura ativa.
                                    <br />Ela expira em <strong>{daysRemaining} {daysRemaining === 1 ? "dia" : "dias"}</strong>.
                                    <br />Aguarde a expiração antes de contratar um novo plano.
                                </Message>
                            )}

                            {!subscriptionActive && (
                                <Form fluid onSubmit={handlePayment}>
                                    <Form.Group controlId="payment-method">
                                        <Form.ControlLabel>Método de Pagamento</Form.ControlLabel>
                                        <SelectPicker
                                            data={[
                                                { label: 'Cartão de Crédito', value: 'credit_card' },
                                                { label: 'Pix', value: 'pix' },
                                                { label: 'Boleto', value: 'boleto' }
                                            ]}
                                            value={paymentMethod}
                                            onChange={setPaymentMethod}
                                            searchable={false}
                                            block
                                        />
                                    </Form.Group>

                                    {paymentMethod === 'credit_card' && (
                                        <>
                                            <Form.Group controlId="card-number">
                                                <Form.ControlLabel>Número do Cartão</Form.ControlLabel>
                                                <Form.Control
                                                    name="cardNumber"
                                                    value={cardInfo.cardNumber}
                                                    onChange={value => setCardInfo({ ...cardInfo, cardNumber: value })}
                                                    maxLength={16}
                                                    placeholder="**** **** **** ****"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="expiry">
                                                <Form.ControlLabel>Validade</Form.ControlLabel>
                                                <Form.Control
                                                    name="expiry"
                                                    type="text"
                                                    value={cardInfo.expiry}
                                                    onChange={value => setCardInfo({ ...cardInfo, expiry: value })}
                                                    maxLength={5}
                                                    placeholder="MM/AA"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="cvv">
                                                <Form.ControlLabel>CVV</Form.ControlLabel>
                                                <Form.Control
                                                    name="cvv"
                                                    type="text"
                                                    value={cardInfo.cvv}
                                                    onChange={value => setCardInfo({ ...cardInfo, cvv: value })}
                                                    maxLength={3}
                                                    placeholder="***"
                                                    required
                                                />
                                            </Form.Group>
                                        </>
                                    )}

                                    <Form.Group>
                                        <Button appearance="primary" type="submit" block disabled={loading || subscriptionActive}>
                                            {loading ? <Loader size="xs" content="Processando..." /> : 'Pagar'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}

                        </>
                    ) : (
                        <Loader size="lg" center content="Carregando detalhes do plano..." />
                    )}
                </Panel>
            </Content>
            <Footer>
                <Rodape />
            </Footer>
        </Container>
    );
}

export default Payment;
