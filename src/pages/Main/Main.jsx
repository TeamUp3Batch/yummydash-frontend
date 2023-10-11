import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import CarouselMain from '../../components/Carousel/Carousel';
import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '800px' }}>
        {/* <CardCarousel/> */}
        <AdsCarousel />
        <CarouselMain />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main;
