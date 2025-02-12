import React from 'react';
import { Container, Content, Footer } from 'rsuite';
import Card_group from '../../components/Card_group/Card_group';
import Header from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';

function Planos() {
    return (
        <Container>
            <Header />
            <Content className="container-content content-spacing">
                <h1>Planos</h1>
                <Card_group buttonText="Assine Agora" />
            </Content>
            <Footer>
                <Rodape /> 
            </Footer>
        </Container>
    );
}

export default Planos;
