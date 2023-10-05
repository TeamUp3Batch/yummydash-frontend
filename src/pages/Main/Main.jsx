import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import CarouselMain from '../../components/Carousel/Carousel';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '800px' }}>
        <CarouselMain />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main;
