import React, { useState } from 'react';
import { Nav } from 'rsuite';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importa o contexto de autenticação
import Dropdown_user from '../Dropdown/Dropdown';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Obtém usuário e função de logout do contexto

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <Nav defaultActiveKey="Home" className={`custom-navbar ${menuOpen ? 'open' : ''}`}>
                <Nav.Item eventKey="logo" className="logo">Rotaclassificados</Nav.Item>
                <div className="nav-items">
                    <Nav.Item eventKey="Home">
                        <Link to='/'>Início</Link>
                    </Nav.Item>
                    <Nav.Item eventKey="Sobre">
                        <Link to="#">Sobre</Link>
                    </Nav.Item>
                    {user ? (
                        <Nav.Item>
                            <Dropdown_user userName={user.name} onLogout={logout} />
                        </Nav.Item>
                    ) : (
                        <Nav.Item eventKey="Auth">
                            <Link to="/login">Login/Cadastro</Link>
                        </Nav.Item>
                    )}
                </div>
            </Nav>
            <div className="hamburger" onClick={toggleMenu}>
                <GiHamburgerMenu size={30} color="white" />
            </div>
        </header>
    );
};

export default Header;
