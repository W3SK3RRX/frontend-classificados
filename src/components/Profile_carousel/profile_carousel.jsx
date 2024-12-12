import { Carousel } from "rsuite";
import './profile_Carousel.css'; // Arquivo CSS para estilização

function Profile_carousel() {
    return (
        <div className="carousel-container">
            <Carousel className="custom-slider">
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" height="250" alt="Slide 1" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="250" alt="Slide 2" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="250" alt="Slide 3" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="250" alt="Slide 4" />
                <img src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="250" alt="Slide 5" />
            </Carousel>
        </div>
    );
}

export default Profile_carousel;
