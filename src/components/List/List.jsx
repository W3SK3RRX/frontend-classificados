import React from "react";
import { List } from "rsuite";
import './List.css';

function Lista({ title, items }) {
    return (
        <div>
            {title && <h3 className="title">{title}</h3>}
            <List hover>
                {items.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                ))}
            </List>
        </div>
    );
}

export default Lista;
