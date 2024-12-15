import React from "react";
import './Sobre.css';
import Header from "../../components/Header/Header";
import { Container, Content, Footer } from "rsuite";
import Hero from "../../components/Hero/hero";
import Card_content from "../../components/Card_content/Card_content";
import Card_group from "../../components/Card_group/Card_group";
import Rodape from "../../components/Footer/Footer";

function Sobre() {
    return (
        <div>
            <Container>
                
                <Header />
                
                <Hero />
                <Content className="content-wrapper">
                    {/* Contêiner do Card_content com espaçamento abaixo */}
                    <div className="card-content-container">
                        <Card_content
                            title="Quem Somos?"
                            body="Somos uma plataforma dedicada a conectar profissionais liberais e pequenas empresas
                            com clientes que buscam qualidade e confiança. Nosso objetivo é facilitar o encontro
                            entre quem precisa de serviços especializados e aqueles que oferecem as melhores
                            soluções no mercado."
                        />
                    </div>

                    {/* Contêiner de cards com grid */}
                    <div className="card-group-container">
                        <Card_group
                            title="Plano Grátis"
                            benefits={[
                                "Acesso limitado ao catálogo de profissionais",
                                "Visualização de até 3 anúncios",
                                "Suporte básico"
                            ]}
                            price="Grátis"
                            buttonText="Assine Agora"
                        />
                        <Card_group
                            title="Plano Pro"
                            benefits={[
                                "Acesso completo ao catálogo de profissionais",
                                "Visualização de anúncios ilimitada",
                                "Suporte prioritário",
                                "Promoção de anúncios"
                            ]}
                            price="R$ 50,00/mês"
                            buttonText="Assine Agora"
                        />
                        <Card_group
                            title="Plano Premium"
                            benefits={[
                                "Acesso completo ao catálogo de profissionais",
                                "Visualização de anúncios ilimitada",
                                "Suporte dedicado 24/7",
                                "Promoção de anúncios premium",
                                "Consultoria personalizada"
                            ]}
                            price="R$ 150,00/mês"
                            buttonText="Assine Agora"
                        />
                    </div>

                </Content>

                <Footer>
                    <Rodape />
                </Footer>
            </Container>
        </div>
    )
}

export default Sobre;
