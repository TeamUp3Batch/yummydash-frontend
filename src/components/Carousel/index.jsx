// Import Swiper React components
// import Swiper core and required modules
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import classes from './swiper.module.scss';

const MyComponent = () => {
  return (
    <div className={classes.swiper__wrapper}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={4}
        navigation
        >
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={classes.swiper__card}>
            <p>card name</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MyComponent;
