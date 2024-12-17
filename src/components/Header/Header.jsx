import React, { useState } from 'react';
import { Nav, Dropdown, Button } from 'rsuite';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importa o contexto de autenticação

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Obtém usuário e função de logout do contexto

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="header">
            <Nav defaultActiveKey="Home" className={`custom-navbar ${menuOpen ? 'open' : ''}`}>
                <Nav.Item eventKey="logo" className="logo">Rotaclassificados</Nav.Item>
                <div className="nav-items">
                    <Link to="/" className="rs-nav-item">Início</Link>
                    {user ? (
                        <Dropdown
                            renderToggle={(props, ref) => (

                                <div {...props} ref={ref} className="user-menu">
                                    <span className="username">{user.username || "Perfil"}</span> {/* Personaliza o nome de usuário */}
                                </div>
                            )}
                        >
                            <Dropdown.Item as={Link} to="/profile">Meu Perfil</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/settings">Configurações</Dropdown.Item>
                            <Dropdown.Item onClick={logout} className="logout-btn">
                                Sair
                            </Dropdown.Item>
                        </Dropdown>

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
