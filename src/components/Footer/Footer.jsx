import './Footer.css';

function Rodape() {
    return (
        <div className="footer-container">
            <div className="footer-links">
                <ul>
                    <li><a href="/termos">Termos e Condições</a></li>
                    <li><a href="/politica-privacidade">Política de Privacidade</a></li>
                    <li><a href="/fale-conosco">Fale Conosco</a></li>
                    <li><a href="/redes-sociais">Redes Sociais</a></li>
                </ul>
            </div>
            <p className='footer'>© 2024 - Rotaclassificados | Todos os direitos reservados.</p>
        </div>
    );
}

export default Rodape;
