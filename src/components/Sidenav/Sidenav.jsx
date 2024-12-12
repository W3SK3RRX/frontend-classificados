import { Sidenav, Nav } from "rsuite"
import LocationIcon from '@rsuite/icons/Location';
import ListIcon from '@rsuite/icons/List';

function Filtros() {
    return (

        <div style={{ width: 200 }}>
            <Sidenav defaultOpenKeys={['3', '4']}>
                <Sidenav.Body>
                    <Nav activeKey="1">
                        <Nav.Menu eventKey="3" title="Cidades" icon={<LocationIcon />}>
                            <Nav.Item eventKey="3-1">Floriano</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu eventKey="4" title="Categorias" icon={<ListIcon />}>
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Channels</Nav.Item>
                            <Nav.Item eventKey="4-3">Versions</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>

    )
}

export default Filtros