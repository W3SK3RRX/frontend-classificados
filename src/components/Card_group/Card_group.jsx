import React from 'react';
import { Card, Button } from 'rsuite';
import './Card_group.css';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';

function Card_group({ title, benefits, price, buttonText }) {
    return (
        <Card className="card-group-card" size="lg">
            <Card.Header className="card-group-card-header">{title}</Card.Header>
            <Card.Body className="card-group-card-body">
                <ul>
                    {benefits.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                            <CheckOutlineIcon className="benefit-icon" />
                            {benefit}
                        </li>
                    ))}
                </ul>
                <div className="card-group-card-price">{price}</div>
            </Card.Body>
            <Card.Footer className="card-group-card-footer">
                <Button className="card-group-card-button" appearance="primary">
                    {buttonText}
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default Card_group;
