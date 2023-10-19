import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';
import CuisineCarouselContainer from '../../components/CuisineCarousel/CuisineCarouselContainer';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div>
        <AdsCarousel />
        <CuisineCarouselContainer />
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Main;
