import { useState, useEffect } from "react";
import { Container, Content, Footer } from 'rsuite';
import { Input, SelectPicker, Rate, Button, List } from "rsuite";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./search.css";
import Rodape from '../../components/Footer/Footer';

export default function SearchFilters() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [city, setCity] = useState(null);
  const [rating, setRating] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/perfil-profissional/");
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setProfessionals(data);
        setFilteredResults(data);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = professionals.filter((prof) =>
      (search ? prof.profile_name.toLowerCase().includes(search.toLowerCase()) : true) &&
      (category ? prof.area_atuacao === category : true) &&
      (city ? prof.endereco.cidade === city : true) &&
      (rating ? prof.rating >= rating : true)
    );
    setFilteredResults(filtered);
  };

  return (
    <Container>
      <Header />
      <Content className="container-content content-spacing">
        <div style={{ padding: 20 }}>
          <Input placeholder="Pesquisar por nome" onChange={setSearch} style={{ marginBottom: 10 }} />
          <SelectPicker
            data={professionals.map((prof) => ({ label: prof.area_atuacao, value: prof.area_atuacao }))}
            placeholder="Categoria"
            onChange={setCategory}
            style={{ width: 200, marginRight: 10 }}
          />
          <SelectPicker
            data={professionals.map((prof) => ({ label: prof.endereco.cidade, value: prof.endereco.cidade }))}
            placeholder="Cidade"
            onChange={setCity}
            style={{ width: 200, marginRight: 10 }}
          />
          <Rate allowHalf defaultValue={rating} onChange={setRating} style={{ marginRight: 10 }} />
          <Button appearance="primary" onClick={handleFilter}>Filtrar</Button>

          {/* Grid de Cards */}
          <div className="card-grid">
            {filteredResults.length > 0 ? (
              filteredResults.map((prof) => (
                <Card
                  key={prof.id}
                  image={prof.foto_logo || "https://via.placeholder.com/150"}
                  title={prof.profile_name || "Nome não disponível"}
                  description={`${prof.endereco?.cidade || "Cidade não disponível"} - ${prof.endereco?.estado || "Estado não disponível"}`}
                  profileId={String(prof.id)} // Certificando-se de que o ID seja string
                />
              ))
            ) : (
              <p className="no-results">Nenhum profissional ou empresa encontrado.</p>
            )}
          </div>
        </div>
      </Content>
      <Footer>
        <Rodape />
      </Footer>
    </Container>
  );
}
