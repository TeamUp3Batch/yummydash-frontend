import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from '../RestaurantCard';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const RestaurantList = ({ selectedCuisine }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}/api/restaurants/getRestaurantsByCuisine`;
        const data = {"cuisine":selectedCuisine}
        const result = await axios.post(url, data);
        console.log("result,",result.data)
        setRestaurants(result.data)
      } catch (error) {
        // Handle errors, e.g., display an error message
        console.error('Error:', error);
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
