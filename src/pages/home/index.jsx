import React, { useEffect, useState } from 'react';
import { Container, Content, Footer } from 'rsuite';
import Header from '../../components/Header/Header';
import Carrossel from "../../components/Carousel/Carousel";
import Filtros_pesquisa from "../../components/Nav/Nav";
import Card from '../../components/Card/Card';
import Loading from '../../components/Loader/Loader';
import Rodape from '../../components/Footer/Footer';
import LocationIcon from '@rsuite/icons/Location';
import './style.css';

function Home() {
  const images = [
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+1",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+2",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+3",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+4",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+5"
  ];

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/perfil-profissional/');
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <Container>
      <Header />
      <Content className="container-content content-spacing">
        <Carrossel images={images} autoplay={true} autoplayInterval={10000} height={300} />

        <Filtros_pesquisa />

        <Container className="sub-content">
          <Content>
            {loading ? (
              <Loading />
            ) : (
              <div className="card-grid">
                {profiles.map((profile) => (
                  <Card
                    key={profile.id}
                    image={profile.foto_logo || "https://via.placeholder.com/150"} // Imagem padrão
                    title={profile.profile_name || "Nome não disponível"}
                    description={
                      `${profile.cidade || "Cidade não disponível"} - ${profile.estado || "Estado não disponível"}`
                    }
                    profileId={profile.id} // Ajustado para usar o ID do perfil
                  />
                ))}
              </div>
            )}
          </Content>
        </Container>
      </Content>
      <Footer>
        <Rodape />
      </Footer>
    </Container>
  );
}

export default Home;
