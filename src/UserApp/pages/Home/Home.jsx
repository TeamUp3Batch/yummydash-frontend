
import React from "react";
import SimpleHeader from "../SimpleHeader/SimpleHeader";
import style from "./home.module.scss";
import Header from "../Header/Header";
import Footer from "../../components/Footer/Footer";
import RestaurantRating from "../../components/OrderSummary/RestaurantRating/RestaurantRating";


const Home = () => {
  const isAuthenticated = false;

  return (
    <div>
      <div className={style.backgroundPic}>
        {isAuthenticated ? (
          <div>
            <Header />
          </div>
        ) : (
          <div>
            <SimpleHeader />
          </div>
        )}
      </div>
      <Footer />
      <RestaurantRating />
    </div>
  );
};
export default Home;
