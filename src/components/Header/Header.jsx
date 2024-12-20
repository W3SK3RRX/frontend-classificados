import React, { useState } from 'react';
import { Nav, Button } from 'rsuite';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <Nav defaultActiveKey="Home" className={`custom-navbar ${menuOpen ? 'open' : ''}`}>
                <Nav.Item eventKey="logo" className="logo">Rotaclassificados</Nav.Item>
                <div className="nav-items">
                    <Link to="/" className="rs-nav-item">Início</Link>
                    {user ? (
                        <Nav.Menu
                            title={<span className="username">{user.username || "Perfil"}</span>}
                            className="user-menu"
                        >
                            <Nav.Item as={Link} to={`/my_profile/${user.id}`}>Meu Perfil</Nav.Item>
                            <Nav.Item as={Link} to="/settings">Configurações</Nav.Item>
                            <Nav.Item onClick={logout} className="logout-btn">Sair</Nav.Item>
                        </Nav.Menu>
                    ) : (
                        <Link
                            to="/login"
                            component={Button}
                            appearance="ghost"
                            color="red"
                            className="rs-nav-item"
                        >
                            Login/Cadastro
                        </Link>
                    )}
                </div>
            </Nav>
            <div
                className="hamburger"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <GiHamburgerMenu size={30} color="white" />
            </div>
        </header>
    );
}

export default Header;
