import React from "react";
import Slider from "react-slick";
import { Container } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../img/yummyAdCarousel1.png";
import image2 from "../../img/yummyAdCarousel2.png";
import image3 from "../../img/yummyAdCarousel3.png";
import image4 from "../../img/yummyAdCarousel4.png";

const YummyAdCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const imageStyle = {
    width: "100%", 
    height: "auto"
  }
  const divStyle = {
    width: "100%", 
    overflow: "auto", 
    padding: "10px"
  }

  return (
    <div>
      <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
        <Slider {...settings}>
          <div style={divStyle}>
            <img
              src={image1}
              alt="carousel"
              style={imageStyle}
            />
          </div>
          <div style={divStyle}>
            <img
              src={image2}
              alt="carousel"
              style={imageStyle}
            />
          </div>
          <div style={divStyle}>
            <img
              src={image3}
              alt="carousel"
              style={imageStyle}
            />
          </div>
          <div style={divStyle}>
            <img
              src={image4}
              alt="carousel"
              style={imageStyle}
            />
          </div>
        </Slider>
      </Container>
    </div>
  );
};

export default YummyAdCarousel;
