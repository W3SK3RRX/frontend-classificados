import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "rsuite";
import "./Nav.css";

function Filtros_pesquisa() {
  const [locations, setLocations] = useState({ estados: [], cidades: [] });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/perfil-profissional/");
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();

        // Extrai estados e cidades sem duplicações
        const estados = [...new Set(data.map((profile) => profile.endereco?.estado).filter(Boolean))];
        const cidades = [...new Set(data.map((profile) => profile.endereco?.cidade).filter(Boolean))];

        setLocations({ estados, cidades });
      } catch (error) {
        console.error("Erro ao buscar estados e cidades:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Navbar className="navbar-filtros">
      <Nav>
        {/* Dropdown de Cidades */}
        <Nav.Menu title="Cidades">
          {locations.cidades.length > 0 ? (
            locations.cidades.map((cidade, index) => <Nav.Item key={index}>{cidade}</Nav.Item>)
          ) : (
            <Nav.Item>Carregando...</Nav.Item>
          )}
        </Nav.Menu>

        {/* Dropdown de Estados */}
        <Nav.Menu title="Estados">
          {locations.estados.length > 0 ? (
            locations.estados.map((estado, index) => <Nav.Item key={index}>{estado}</Nav.Item>)
          ) : (
            <Nav.Item>Carregando...</Nav.Item>
          )}
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
}

export default Filtros_pesquisa;
