import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MyProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/users/${id}/me/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados do perfil:", error);
            }
        };

        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Meu Perfil</h1>
            <p><strong>Nome:</strong> {profile.username}</p>
            <p><strong>Sobrenome:</strong> {profile.lastname}</p>
            <p><strong>E-mail:</strong> {profile.email}</p>
        </div>
    );
}

export default MyProfile;
