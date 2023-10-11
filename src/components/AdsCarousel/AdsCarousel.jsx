import React from 'react';

//Swiper
import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import classes from './AdsCarousel.module.scss';

import image1 from '../../img/carouselImage1.jpeg';
import image2 from '../../img/carouselImage2.jpeg';
import image3 from '../../img/carouselImage3.jpeg';
import image4 from '../../img/carouselImage4.jpeg';

const AdsCarousel = () => {
  return (
    <div className={classes.adsswiper__wrapper}>
      <Swiper modules={[Navigation, Autoplay]} spaceBetween={14} slidesPerView={2} navigation autoplay>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <img src={image1} alt="clone"/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={classes.swiper__card}>
            <img src={image2} alt="clone"/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={classes.swiper__card}>
            <img src={image3} alt="clone"/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={classes.swiper__card}>
            <img src={image4} alt="clone"/>
          </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default AdsCarousel;
