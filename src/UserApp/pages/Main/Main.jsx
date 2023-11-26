import React, { useState } from "react";
import Header from "../Header/Header";

import AdsCarousel from "../../components/AdsCarousel/AdsCarousel";
import CuisineCarouselContainer from "../../components/CuisineCarousel/CuisineCarouselContainer";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import classes from "./main.module.scss";

const Main = () => {
  const [sorting, setSorting] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <React.Fragment>
      <Header
        sorting={sorting}
        setSorting={setSorting}
        setSearchQuery={setSearchQuery}
      />
      <div>
        {searchQuery ? (
          <div className={classes.restaurant__wrapper}>
            <div className={classes.restaurant__list}>
              <RestaurantList
                searchQuery={searchQuery}
                selectedSort={sorting}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <AdsCarousel />
        <CuisineCarouselContainer selectedSort={sorting} />
      </div>
    </React.Fragment>
  );
};

export default Main;
