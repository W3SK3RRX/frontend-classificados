import React from 'react';
import './reviews.css';

function Reviews() {
    // Dados de Avaliações
    const reviews = [
        { user: "Carlos Oliveira", rating: 4, comment: "Ótimo profissional, atendeu todas as minhas expectativas!" },
        { user: "Maria Souza", rating: 5, comment: "Excelente! Super recomendo os serviços prestados." },
        { user: "Pedro Almeida", rating: 3, comment: "Bom serviço, mas houve alguns atrasos na entrega." }
    ];

    return (
        <div className="profile-reviews">
            <h2>Avaliações</h2>
            <div className="reviews-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <h4>{review.user}</h4>
                        <div className="rating">
                            {Array(review.rating).fill().map((_, i) => (
                                <span key={i} className="star">★</span>
                            ))}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
