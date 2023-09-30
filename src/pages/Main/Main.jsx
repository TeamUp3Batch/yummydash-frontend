import React from "react";
import Header from "../Header/Header";
import Footer from "../../components/Footer/Footer";

const Main = ()=> {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '800px' }}> {/* Adjust the height as needed */}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Main;
