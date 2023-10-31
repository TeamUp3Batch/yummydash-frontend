import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';
import CuisineCarouselContainer from '../../components/CuisineCarousel/CuisineCarouselContainer';


const Main = () => {
  const [sorting, setSorting] = useState('rating'); // Initial sorting value
  return (
    <React.Fragment>
      <Header sorting={sorting} setSorting={setSorting}/>
      <div>
        <AdsCarousel />
        <CuisineCarouselContainer selectedSort={sorting} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main;
