import React from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import YummyAdCarousel from '../../components/YummyAdCarousel/YummyAdCarousel';
import CuisineCarousel from '../../components/CuisineCarousel/CuisineCarousel';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '800px' }}>
        <YummyAdCarousel/>
        <CuisineCarousel />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main;
