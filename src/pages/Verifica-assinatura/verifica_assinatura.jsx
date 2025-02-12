import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VerificarAssinatura() {
    const [loading, setLoading] = useState(true);
    const [temAssinatura, setTemAssinatura] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function checarAssinatura() {
            try {
                const response = await fetch("/subscriptions/subscription-status/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}` // Supondo que o token está salvo no localStorage
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.active) {
                        setTemAssinatura(true);
                    } else {
                        setTemAssinatura(false);
                    }
                } else {
                    setTemAssinatura(false);
                }
            } catch (error) {
                console.error("Erro ao verificar assinatura:", error);
                setTemAssinatura(false);
            } finally {
                setLoading(false);  // Certifique-se de que o loading seja finalizado aqui
            }
        }

        checarAssinatura();
    }, []);

    useEffect(() => {
        if (!loading) {
            // Somente redireciona após a verificação de assinatura ser concluída
            if (temAssinatura) {
                navigate("/cadastro-perfil");
            } else {
                navigate("/planos");
            }
        }
    }, [loading, temAssinatura, navigate]);

    return <p>Verificando assinatura...</p>;
}

export default VerificarAssinatura;
