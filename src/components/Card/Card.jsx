import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ image = 'https://via.placeholder.com/150', title = 'Título não disponível', description = 'Descrição não disponível', profileId }) {
    return (
        <div className="card" role="article">
            <img 
                src={image} 
                alt={title} 
                className="card-image" 
            />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <Link to={`/profile/${profileId}`}>
                    <Button appearance="primary" className="card-button">
                        Ver detalhes
                    </Button>
                </Link>
            </div>
        </div>
    );
}

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    profileId: PropTypes.string.isRequired,
};

export default Card;
