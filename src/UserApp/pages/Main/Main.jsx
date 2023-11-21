import React, { useState } from 'react';
import Header from '../Header/Header';

import AdsCarousel from '../../components/AdsCarousel/AdsCarousel';
import CuisineCarouselContainer from '../../components/CuisineCarousel/CuisineCarouselContainer';
// import CourierRating from '../../components/OrderSummary/CourierRating/CourierRating';


const Main = () => {
  const [sorting, setSorting] = useState('rating'); // Initial sorting value
  return (
    <React.Fragment>
      <Header sorting={sorting} setSorting={setSorting}/>
      <div>
        <AdsCarousel />
        <CuisineCarouselContainer selectedSort={sorting} />
      </div>
      {/* <CourierRating /> */}
    </React.Fragment>
  );
};

export default Main;
