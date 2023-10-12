import React from "react";
import { useEffect, useState } from "react";

//Axios
import axios from "axios";
import { CuisinesURL } from "../../api/ApiLinks";

// Import Swiper React components
// import Swiper core and required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import classes from "./swiper.module.scss";
import RestaurantList from "../RestaurantList";

const MyComponent = () => {
  const [cuisineList, setCuisineList] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  useEffect(() => {
    axios.get(CuisinesURL).then((response) => setCuisineList(response.data));
  }, []);

  return (
    <div>
      <div className={classes.swiper__wrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={4}
          navigation
        >
          {cuisineList.map((card) => (
            <SwiperSlide>
              <div
                className={classes.swiper__card}
                key={card._id}
                style={{
                  cursor:'pointer',
                  background: `linear-gradient(rgba(255, 255, 255, 0) 15%, rgba(0, 0, 0, 0.6) 100%), url(${card.imageUrl})`,
                }}
                onClick={() => handleCuisineClick(card.name)}
              >
                <p>{card.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={classes.restaurant__wrapper}>
        <div className={classes.restaurant__list}>
          <RestaurantList selectedCuisine={selectedCuisine} />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
