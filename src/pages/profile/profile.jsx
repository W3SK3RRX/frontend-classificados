import React from "react";
import './profile.css';
import Header from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import Reviews from '../../components/Reviews/reviews';
import Card_content from "../../components/Card_content/Card_content";
import SearchDataLiveIcon from '@rsuite/icons/SearchDataLive';
import MediaIcon from '@rsuite/icons/Media';
import ReviewIcon from '@rsuite/icons/Review';
import LocationIcon from '@rsuite/icons/Location';
import Lista from '../../components/List/List';

import { Container, Content, Footer, Avatar, Button } from "rsuite";

function Profile() {

    const user = {
        name: "João Silva",
        email: "joao.silva@example.com",
        phone: "(11) 98765-4321",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua das Flores",
        number: "123",
        cep: "12345-678",
    };

    const profile = {
        type: "Profissional Liberal",
        bio: "Sou um consultor com experiência em gestão financeira e contabilidade.",
        area: "Consultoria Financeira",
        certificates: ["Certificado A", "Certificado B"],
        professionalRecords: ["registro1.jpg", "registro2.jpg"],
        services: ["Consultoria Financeira", "Análise de Investimentos", "Planejamento Tributário"],  // Adicionei os serviços aqui
    };

    return (
        <Container>
            <Header />
            <Content>
                <div className="profile-page">
                    {/* Seção do topo */}
                    <div className="profile-header">
                        {/* Foto de capa */}
                        <div className="cover-photo"></div>

                        {/* Detalhes do perfil */}
                        <div className="profile-details">
                            {/* Foto de perfil */}
                            <div className="profile-picture-container">
                                <Avatar className="profile-picture" size="xxl" circle />
                            </div>

                            {/* Nome e informações do usuário */}
                            <div className="user-info">
                                <h1>{user.name}</h1>

                                {/* Links para seções */}
                                <div className="profile-links">
                                    <a href="#services-offered">
                                        <SearchDataLiveIcon style={{ marginRight: '8px' }} />
                                        Serviços
                                    </a>
                                    <a href="#medias">
                                        <MediaIcon style={{ marginRight: '8px' }} />
                                        Mídias
                                    </a>
                                    <a href="#reviews">
                                        <ReviewIcon style={{ marginRight: '8px' }} />
                                        Avaliações
                                    </a>
                                </div>

                                {/* Endereço */}
                                <p className="address">
                                    <LocationIcon className="location-icon" />
                                    Endereço: {user.street}, {user.number}, {user.neighborhood}, {user.city} - CEP: {user.cep}
                                </p>

                                {/* Botão de contratação */}
                                <Button appearance="primary" className="hire-button">
                                    Contratar Serviços
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Seção descrição */}
                    <div className="profile-content" id="services">
                        <h2>Descrição</h2>
                        <div className="profile-announcement">
                            <div className="profile-item">
                                <h3>Tipo de Perfil:</h3>
                                <p>{profile.type}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Área de Atuação:</h3>
                                <p>{profile.area}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Biografia:</h3>
                                <p>{profile.bio}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Certificados:</h3>
                                <p>{profile.certificates.join(", ")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Seção Serviços Oferecidos */}
                    <div className="profile-content" id="services-offered">
                        <Lista title="Serviços Oferecidos" items={profile.services} />
                    </div>

                    {/* Seção Registros Profissionais */}
                    <div className="profile-content" id="medias">
                        <h2>Registros Profissionais</h2>
                        <div className="professional-records">
                            {profile.professionalRecords.map((record, index) => (
                                <div key={index} className="record-item">
                                    <img src={record} alt={`Registro ${index + 1}`} className="record-img" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seção de Avaliações */}
                    <Reviews id="reviews" />
                </div>
            </Content>
            <Footer>
                <Rodape />
            </Footer>
        </Container>
    );
}

export default Profile;
