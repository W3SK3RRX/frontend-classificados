import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">Rotaclassificados</Link>
                
                <nav className={`nav-items ${menuOpen ? 'open' : ''}`}>
                    {user && <Link to="/home" className="nav-link">Início</Link>}
                    {user && <Link to="/contracts" className="nav-link">Meus Contratos</Link>}
                    {user && <Link to="/SearchFilters" className="nav-link">Busca Avançada</Link>}
                    
                    {user ? (
                        <div className="nav-link dropdown" ref={dropdownRef}>
                            <button className="dropdown-btn" onClick={toggleDropdown}>
                                {user.username || "Perfil"}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to={`/my_profile/${user.id}`} className="dropdown-item">Meu Perfil</Link>
                                    <Link to="/settings" className="dropdown-item">Configurações</Link>
                                    <button onClick={logout} className="dropdown-item logout-btn">Sair</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">Login/Cadastro</Link>
                    )}
                </nav>

                <div className="hamburger" onClick={toggleMenu}>
                    <GiHamburgerMenu size={30} color="white" />
                </div>
            </div>
        </header>
    );
}

export default Header;
