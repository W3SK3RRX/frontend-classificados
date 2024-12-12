import { Carousel } from 'rsuite';
import img1 from '../../assets/img/aaa.jpg';
import img2 from '../../assets/img/bbb.jpg';
import img3 from '../../assets/img/ccc.jpg';

function Carrossel() {
    return (
        <Carousel className="custom-slider">
            <img src={img1} alt="Imagem 1" height="250" />
            <img src={img2} alt="Imagem 2" height="250" />
            <img src={img3} alt="Imagem 3" height="250" />
        </Carousel>
    );
}

export default Carrossel;
