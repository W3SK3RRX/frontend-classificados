import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ image, title, description }) {
    return (
        <div className="card" role="article">
            <img 
                src={image || 'https://via.placeholder.com/150'} 
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

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
};

Card.defaultProps = {
    image: 'https://via.placeholder.com/150',
    title: 'Título não disponível',
    description: 'Descrição não disponível',
};

export default Card;
