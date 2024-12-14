import React from 'react';
import { Card } from 'rsuite';
import './Card_content.css';

function Card_content({ title, body }) {
    return (
        <Card className="card-content-card" size="lg">
            <Card.Header className="card-content-card-header">{title}</Card.Header>
            <Card.Body className="card-content-card-body">
                <p>{body}</p>
            </Card.Body>
        </Card>
    );
}

export default Card_content;
