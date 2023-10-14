import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';
import CuisineCarousel from '../../components/CuisineCarousel/CuisineCarousel';
import Menu from '../../components/Menu/Menu';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div>
        <AdsCarousel />
        <CuisineCarousel />
        <Menu />
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Main;
