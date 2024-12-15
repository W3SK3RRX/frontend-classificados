import React from "react";
import { Carousel } from "rsuite";

const Carrossel = ({ images, autoplay = true, autoplayInterval = 10000, shape = "bar", height = 250 }) => {
    return (
        <Carousel 
            autoplay={autoplay} 
            autoplayInterval={autoplayInterval} 
            className="custom-slide" 
            shape={shape}
        >
            {images.map((src, index) => (
                <img 
                    key={index} 
                    src={src} 
                    height={height} 
                    alt={`Slide ${index + 1}`} 
                    style={{ objectFit: 'cover' }}
                />
            ))}
        </Carousel>
    );
};

export default Carrossel;
