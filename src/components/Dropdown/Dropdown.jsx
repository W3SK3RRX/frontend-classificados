import React from 'react';
import { Dropdown } from "rsuite";
import DropdownItem from 'rsuite/esm/Dropdown/DropdownItem';

function Dropdown_user({ userName, onLogout }) {
    return (
        <Dropdown title={userName} trigger={['click', 'hover']}>
            <DropdownItem>Meu Perfil</DropdownItem>
            <DropdownItem onClick={onLogout}>Sair</DropdownItem>
        </Dropdown>
    );
}

export default Dropdown_user;
