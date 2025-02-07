import React, { useState, useEffect } from "react";
import './profile.css';
import Header from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import Reviews from '../../components/Reviews/reviews';
import SearchDataLiveIcon from '@rsuite/icons/SearchDataLive';
import MediaIcon from '@rsuite/icons/Media';
import ReviewIcon from '@rsuite/icons/Review';
import LocationIcon from '@rsuite/icons/Location';
import Lista from '../../components/List/List';

import { Container, Content, Footer, Avatar, Button } from "rsuite";

function Profile() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const userId = 1;
        fetch(`http://127.0.0.1:8000/perfil-profissional/${userId}/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Erro ao carregar os dados do perfil:", error);
            });
    }, []);

    if (!data) {
        return <div>Carregando...</div>;
    }

    return (
        <Container>
            <Header />
            <Content>
                <div className="profile-page">
                    <div className="profile-header">
                        <div className="cover-photo"></div>
                        <div className="profile-details">
                            <div className="profile-picture-container">
                                <Avatar className="profile-picture" size="xxl" circle />
                            </div>
                            <div className="user-info">
                                <h1>{data.profile_name}</h1>
                                <p className="address">
                                    <LocationIcon className="location-icon" />
                                    Endereço: {data.endereco.rua}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.cidade} - CEP: {data.endereco.cep}
                                </p>
                                <Button appearance="primary" className="hire-button">Contratar Serviços</Button>
                            </div>
                        </div>
                    </div>
                    <div className="profile-content" id="services">
                        <h2>Descrição</h2>
                        <div className="profile-announcement">
                            <div className="profile-item">
                                <h3>Tipo de Perfil:</h3>
                                <p>{data.user_type}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Área de Atuação:</h3>
                                <p>{data.area_atuacao}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Biografia:</h3>
                                <p>{data.biografia}</p>
                            </div>
                            <div className="profile-item">
                                <h3>Certificados:</h3>
                                <p>{data.certificados ? data.certificados.join(", ") : "Nenhum certificado disponível"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
            <Footer>
                <Rodape />
            </Footer>
        </Container>
    );

}

export default Profile;
