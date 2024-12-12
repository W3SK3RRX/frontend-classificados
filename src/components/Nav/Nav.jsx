import { Navbar, Nav } from 'rsuite';
import './Nav.css';  // Certifique-se de importar o arquivo de estilos

function Filtros_pesquisa() {
    return (
        <Navbar className="navbar-filtros">
            <Nav>
                <Nav.Menu title="Cidades">
                    <Nav.Item>Floriano</Nav.Item>
                    <Nav.Item>Teresina</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Categorias">
                    <Nav.Item>aaa</Nav.Item>
                    <Nav.Item>bbb</Nav.Item>
                    <Nav.Item>aaa</Nav.Item>
                    <Nav.Item>bbb</Nav.Item>
                </Nav.Menu>
            </Nav>
        </Navbar>
    )
}

export default Filtros_pesquisa;
