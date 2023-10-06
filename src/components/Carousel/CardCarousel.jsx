import React from "react";
import Slider from "react-slick";
import { Container } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../img/carouselImage1.jpeg";
import image2 from "../../img/carouselImage2.jpeg";
import image3 from "../../img/carouselImage3.jpeg";
import image4 from "../../img/carouselImage4.jpeg";

const CardCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <div>
      <Container maxWidth="lg" style={{paddingTop: "300px"}}>
        <Slider {...settings}>
          <div>
            <img src={image1} alt="carousel" style={{ height: "300px"  , width: "300px"}} />
          </div>
          <div>
            <img src={image2} alt="carousel" style={{ height: "300px"  , width: "300px"}} />
          </div>
          <div>
            <img src={image3} alt="carousel" style={{height: "300px"  , width: "300px"}} />
          </div>
          <div>
            <img src={image4} alt="carousel" style={{ height: "300px"  , width: "300px"}} />
          </div>
          <div>
            <img src={image1} alt="carousel" style={{ height: "300px"  , width: "300px"}} />
          </div>
        </Slider>
      </Container>
    </div>
  );
};

export default CardCarousel;
