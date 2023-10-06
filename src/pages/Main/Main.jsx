import React from "react";
import Header from "../Header/Header";
import Footer from "../../components/Footer/Footer";
import CardCarousel from "../../components/Carousel/CardCarousel";

const Main = ()=> {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '800px' }}> 
      {/* <CardCarousel/> */}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Main;
