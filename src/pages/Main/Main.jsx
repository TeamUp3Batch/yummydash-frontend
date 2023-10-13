import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';
import CuisineCarousel from '../../components/CuisineCarousel/CuisineCarousel';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div >
        <AdsCarousel />
        <CuisineCarousel />
      </div>
     {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Main;
