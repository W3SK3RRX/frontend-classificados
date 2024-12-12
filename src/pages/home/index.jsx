import React, { useEffect, useState } from 'react';
import './style.css';
import { Container, Content, Footer } from 'rsuite';
import Header from '../../components/Header/Header';
import Carrossel from '../../components/Carousel/Carousel';
import Filtros_pesquisa from '../../components/Nav/Nav';
import Card from '../../components/Card/Card';
import Rodape from '../../components/Footer/Footer';
import Loading from '../../components/Loader/Loader';

function Home() {
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
    <div className="show-container">
      <Header />
      <div className="main-content">
        <Container>
          <Content>
            Carrossel
          </Content>
        </Container>

        <Container>
          <Content>
            Filtros_pesquisa
          </Content>
        </Container>

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
      </div>

      Rodape
    </div>
  );

}

export default Home;
