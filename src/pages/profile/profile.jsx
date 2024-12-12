import React from "react";
import './profile.css';
import Header from '../../components/Header/Header'
import Rodape from '../../components/Footer/Footer';
import Reviews from '../../components/Reviews/reviews'
import Profile_carousel from "../../components/Profile_carousel/profile_carousel";
import { Container, Content, Footer, Avatar } from "rsuite";

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
    };

    return (

        <Container>
            <Header>
                <Header />
            </Header>
            <Content>
                <div className="profile-page">
                    {/* Seção do topo */}
                    <div className="profile-header">
                        <div className="cover-photo"></div>
                        <div className="profile-details">
                            <Avatar className="profile-picture" size="xxl" circle />
                            
                            <div className="user-info">
                                <h1>{user.name}</h1>
                                <p>Email: {user.email}</p>
                                <p>Telefone: {user.phone}</p>
                                <p>Endereço: {user.street}, {user.number}, {user.neighborhood}, {user.city} - CEP: {user.cep}</p>
                            </div>
                        </div>
                    </div>

                    {/* Seção de anúncios */}
                    <div className="profile-content">
                        <h2>Meus Anúncios</h2>
                        <div className="profile-announcement">
                            <h3>Tipo de Perfil: {profile.type}</h3>
                            <p><strong>Área de Atuação:</strong> {profile.area}</p>
                            <p><strong>Biografia:</strong> {profile.bio}</p>
                            <p><strong>Certificados:</strong> {profile.certificates.join(", ")}</p>
                            <p><strong>Registros Profissionais:</strong></p>
                            <div className="professional-records">
                                <Profile_carousel />
                            </div>
                        </div>
                    </div>


                    {/* Seção de Avaliações - Agora com o componente separado */}
                    <Reviews /> {/* Exibindo a seção de avaliações */}
                </div>
            </Content>
            <Footer>
                <Rodape />
            </Footer>
        </Container>

    );
}

export default Profile;