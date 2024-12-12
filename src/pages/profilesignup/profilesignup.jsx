import React, { useState } from 'react';
import './profileSignup.css';

function ProfileSignup() {
    const [profileType, setProfileType] = useState('liberal');

    const handleProfileTypeChange = (event) => {
        setProfileType(event.target.value);
    };

    return (
        <div className="profile-signup-container">
            <h1>Cadastro de Perfil Profissional</h1>
            <form className="profile-signup-form">
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

                {/* Área de atuação */}
                <div className="form-group">
                    <label htmlFor="area">Área de Atuação:</label>
                    <input type="text" id="area" placeholder="Ex.: Consultoria, Advocacia, Saúde" required />
                </div>

                {/* Biografia */}
                <div className="form-group">
                    <label htmlFor="biography">Biografia:</label>
                    <textarea id="biography" rows="5" placeholder="Fale sobre você ou sua empresa" required></textarea>
                </div>

                {/* Certificados */}
                <div className="form-group">
                    <label htmlFor="certificates">Certificados:</label>
                    <input type="file" id="certificates" multiple />
                </div>

                {/* Registros profissionais */}
                <div className="form-group">
                    <label htmlFor="professional-records">Registros Profissionais (até 8 fotos):</label>
                    <input type="file" id="professional-records" accept="image/*" multiple />
                </div>

                {/* Termos e condições */}
                <div className="form-group terms">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                        Concordo com os <a href="/terms">termos e condições</a>.
                    </label>
                </div>

                <button type="submit" className="profile-signup-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default ProfileSignup;
