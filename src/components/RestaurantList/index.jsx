import React, { useEffect, useState } from "react";
import RestaurantCard from "../RestaurantCard";
import { getRestaurantsByCuisine } from "../../services/restaurantService"; // Import the service
import { useDispatch } from "react-redux";
import { setRestaurantsByCuisine } from "../../slices/restaurantSlice";
import { useFetchRestaurants } from "./hooks/useFetchRestaurants";

const RestaurantList = ({ selectedCuisine }) => {
  const { restaurants, isLoading, isError } = useFetchRestaurants({
    selectedCuisine,
  });
  if (isLoading) {
    return (
      <div>
        <h1>Restaurants Near You</h1>
        <div>Loading...</div>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>Restaurants Near You</h1>
        <div>Something went wrong</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Restaurants Near You</h1>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <RestaurantCard cardDetails={restaurant} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
