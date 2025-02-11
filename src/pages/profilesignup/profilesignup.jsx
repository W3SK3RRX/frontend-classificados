import React, { useState } from 'react';
import CustomTabs from '../../components/CustomTabs/customtabs';
import './profileSignup.css';

function ProfileSignup() {
    const [profileType, setProfileType] = useState('liberal');

    const handleProfileTypeChange = (event) => {
        setProfileType(event.target.value);
    };

    const initialDataTab = (
        <div>
            {/* Tipo de perfil */}
            <div className="form-group">
                <label htmlFor="profile-type">Tipo:</label>
                <select id="profile-type" value={profileType} onChange={handleProfileTypeChange} required>
                    <option value="liberal">Profissional Liberal</option>
                    <option value="empresa">Empresa</option>
                </select>
            </div>

            {/* Foto de perfil */}
            <div className="form-group">
                <label htmlFor="profile-photo">Foto de Perfil:</label>
                <input type="file" id="profile-photo" accept="image/*" required />
            </div>

            {/* Nome do profissional ou empresa */}
            <div className="form-group">
                <label htmlFor="profile-name">
                    {profileType === 'liberal' ? 'Nome do Profissional:' : 'Nome da Empresa:'}
                </label>
                <input
                    type="text"
                    id="profile-name"
                    placeholder={profileType === 'liberal' ? 'Digite seu nome completo' : 'Digite o nome da empresa'}
                    required
                />
            </div>

            {/* CPF ou CNPJ */}
            {profileType === 'liberal' ? (
                <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" placeholder="Digite seu CPF" required />
                </div>
            ) : (
                <div className="form-group">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" placeholder="Digite seu CNPJ" required />
                </div>
            )}

            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Digite seu email" required />
            </div>

            {/* Telefone */}
            <div className="form-group">
                <label htmlFor="phone">Telefone:</label>
                <input type="tel" id="phone" placeholder="(XX) XXXXX-XXXX" required />
            </div>
        </div>
    );

    const addressTab = (
        <div>
            {/* Endereço completo */}
            <div className="form-group">
                <label htmlFor="city">Cidade:</label>
                <input type="text" id="city" placeholder="Digite sua cidade" required />
            </div>
            <div className="form-group">
                <label htmlFor="neighborhood">Bairro:</label>
                <input type="text" id="neighborhood" placeholder="Digite seu bairro" required />
            </div>
            <div className="form-group">
                <label htmlFor="street">Rua:</label>
                <input type="text" id="street" placeholder="Digite sua rua" required />
            </div>
            <div className="form-group">
                <label htmlFor="number">Número:</label>
                <input type="text" id="number" placeholder="Número da residência" required />
            </div>
            <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" placeholder="Digite seu CEP" required />
            </div>
        </div>
    );

    const tabItems = [
        { title: 'Dados Iniciais', content: initialDataTab },
        { title: 'Endereço Completo', content: addressTab }
    ];

    return (
        <div className="profile-signup-container">
            <h1>Cadastro de Perfil Profissional</h1>
            <form className="profile-signup-form">
                <CustomTabs tabItems={tabItems} />
                {/* Outros campos do formulário */}
                <button type="submit" className="profile-signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default ProfileSignup;
