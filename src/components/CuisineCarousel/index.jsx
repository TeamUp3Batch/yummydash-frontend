import React from "react";
import { useEffect, useState } from "react";
import { getCuisineList } from "../../services/restaurantService"; // Import the service


// Import Swiper React components
// import Swiper core and required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
    const fetchData = async () => {
      try {
        const cuisines = await getCuisineList();
        setCuisineList(cuisines);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
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
          <RestaurantList selectedCuisine={selectedCuisine} />
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
