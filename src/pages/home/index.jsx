import React, { useEffect, useState } from 'react';
import { Container, Content, Footer } from 'rsuite';
import Header from '../../components/Header/Header';
import Carrossel from "../../components/Carousel/Carousel";
import Filtros_pesquisa from "../../components/Nav/Nav";
import Card from '../../components/Card/Card';
import Loading from '../../components/Loader/Loader';
import Rodape from '../../components/Footer/Footer'
import './style.css';

function Home() {
  const images = [
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+1",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+2",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+3",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+4",
    "https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=Slide+5"
  ];

  const [profiles, setProfiles] = useState([]); // Estado para armazenar os perfis
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  useEffect(() => {
    // Função para buscar os dados
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/perfis/'); // Substitua pela URL da sua API
        const data = await response.json();
        setProfiles(data); // Atualiza os perfis
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      } finally {
        setLoading(false); // Remove o indicador de carregamento
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
                    image={profile.image}
                    title={`${profile.profile_name}`}
                    description={`${profile.endereco.cidade} - ${profile.endereco.estado}`}
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
