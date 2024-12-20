import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Rodape from "../../components/Footer/Footer";
import './Myprofile.css';

import { Container, Content, Footer, Avatar, Button } from "rsuite";

function Myprofile() {

    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/users/${id}/me/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados do perfil:", error);
            }
        };

        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Carregando...</div>;
    }

    return (

        <Container>
            <Header />
            <Content>
                <div>
                    <h1>Meu Perfil</h1>
                    <p><strong>Nome:</strong> {profile.username}</p>
                    <p><strong>Sobrenome:</strong> {profile.lastname}</p>
                    <p><strong>E-mail:</strong> {profile.email}</p>
                </div>
            </Content>
            <Footer>
                <Rodape />
            </Footer>
        </Container>

    )
}

export default Myprofile;