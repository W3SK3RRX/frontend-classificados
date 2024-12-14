import React from "react";
import './hero.css'

function Hero() {
    return (

        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Rotaclassificados</h1>
                <p className="hero-subtitle">Encontre os melhores profissionais e serviços em um só lugar.</p>
                <div className="hero-buttons">
                    <a href="#services" className="btn btn-primary">
                        Buscar profissionais
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        Anunciar agora
                    </a>
                </div>
            </div>
            {/*<div className="hero-image">
                <img src="hero-image.jpg" alt="Imagem destacada" />
            </div>*/}
        </section>

    )
}

export default Hero;