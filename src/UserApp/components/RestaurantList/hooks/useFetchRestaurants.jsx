import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRestaurantsByCuisine } from "../../../../services/restaurantService";
import { setRestaurantsByCuisine } from "../../../../slices/restaurantSlice";
export const useFetchRestaurants = ({ selectedCuisine, selectedSort }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        if (selectedCuisine === null) {
          let selectedCuisine = "Vegetarian";
          const data = await getRestaurantsByCuisine(selectedCuisine, selectedSort);
          dispatch(setRestaurantsByCuisine());
          setRestaurants(data);
        }
        if (selectedCuisine != null) {
          const data = await getRestaurantsByCuisine(selectedCuisine, selectedSort);
          dispatch(setRestaurantsByCuisine());
          setRestaurants(data);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCuisine, selectedSort, setIsLoading, setIsError]);
  return {
    restaurants,
    isLoading,
    isError,
  };
};
