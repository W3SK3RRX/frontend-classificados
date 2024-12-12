import React from 'react';
import PropTypes from 'prop-types'; // Importação para validação de tipos
import './Card.css';

function Card({ image, title, description }) {
    return (
        <div className="card">
            <img 
                src={image || 'https://via.placeholder.com/150'} // Exibe uma imagem placeholder se nenhuma for fornecida
                alt={title || 'Imagem não disponível'} 
                className="card-image" 
            />
            <div className="card-content">
                <h3 className="card-title">{title || 'Título não disponível'}</h3>
                <p className="card-description">{description || 'Descrição não disponível'}</p>
            </div>
        </div>
    );
}

// Validação das props para evitar erros
Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

// Valores padrão para as props (fallbacks)
Card.defaultProps = {
    image: 'https://via.placeholder.com/150', // Imagem padrão
    title: 'Título não disponível',
    description: 'Descrição não disponível',
};

export default Card;
