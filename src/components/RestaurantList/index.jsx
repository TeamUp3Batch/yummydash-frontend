import React, { useEffect, useState } from 'react';
import RestaurantCard from '../RestaurantCard';
import { getRestaurantsByCuisine } from "../../services/restaurantService"; // Import the service


const RestaurantList = ({ selectedCuisine }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurantsByCuisine(selectedCuisine);
        setRestaurants(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedCuisine]);

  return (
    <div>
      <h1>Restaurants Near You</h1>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
        <RestaurantCard cardDetails={restaurant}/>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
