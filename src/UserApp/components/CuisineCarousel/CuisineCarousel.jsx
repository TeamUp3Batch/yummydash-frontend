import React from "react";
import { useCuisineCarousel } from "./hooks/useCuisineCarousel";

// Import Swiper React components
// import Swiper core and required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import classes from "./swiper.module.scss";
import RestaurantList from "../RestaurantList/RestaurantList";

const CuisineCarousel = ({selectedSort}) => {
  const {
    cuisineList,
    selectedCuisine,
    isLoading,
    isError,
    handleCuisineClick,
  } = useCuisineCarousel({});
  if (isLoading) {
    return (
      <div>
        <h1>Cuisines</h1>
        <div>Loading...</div>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>Cuisines</h1>
        <div>Something went wrong</div>
      </div>
    );
  }
  return (
    <div>
      <div className={classes.swiper__wrapper}>
      <Swiper modules={[Navigation]} spaceBetween={8} slidesPerView={4} navigation>
  {cuisineList.map((card) => (
    <SwiperSlide key={card._id}> {/* Move the key prop here */}
      <div
        className={classes.swiper__card}
        style={{
          cursor: "pointer",
          background: `linear-gradient(rgba(255, 255, 255, 0) 15%, rgba(0, 0, 0, 0.6) 100%), url(${card.imageUrl})`,
        }}
        onClick={() => handleCuisineClick(card.name)}
      >
        {selectedCuisine === card.name && (
          <CheckCircleIcon
            sx={{
              color: "red",
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "24px",
              zIndex: 1,
            }}
          />
        )}
        <p>{card.name}</p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      </div>
      <div className={classes.restaurant__wrapper}>
        <div className={classes.restaurant__list}>
          <RestaurantList selectedCuisine={selectedCuisine} selectedSort={selectedSort} />
        </div>
      </div>
    </div>
  );
};

export default CuisineCarousel;
