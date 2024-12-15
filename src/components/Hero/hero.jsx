import React from "react";
import { Link } from "react-router-dom";
import './hero.css';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Rotaclassificados</h1>
                <p className="hero-subtitle">Encontre os melhores profissionais e serviços em um só lugar.</p>
                <div className="hero-buttons">
                    <Link to="/home" className="btn btn-primary">
                        Buscar profissionais
                    </Link>
                    <Link to="/contact" className="btn btn-secondary">
                        Anunciar agora
                    </Link>
                </div>
            </div>
            {/*<div className="hero-image">
                <img src="hero-image.jpg" alt="Imagem destacada" />
            </div>*/}
        </section>
    );
}

export default Hero;
