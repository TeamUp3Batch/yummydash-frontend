import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getRestaurantsByCuisine,
  restaurantSearch,
} from "../../../../services/restaurantService";
import { setRestaurantsByCuisine } from "../../../../slices/restaurantSlice";
export const useFetchRestaurants = ({
  selectedCuisine,
  selectedSort,
  searchQuery,
}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
          const data = await getRestaurantsByCuisine(
            selectedCuisine,
            selectedSort
          );
          dispatch(setRestaurantsByCuisine());
          setRestaurants(data);
        }
        if (selectedCuisine != null) {
          const data = await getRestaurantsByCuisine(
            selectedCuisine,
            selectedSort
          );
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        if (searchQuery != null) {
          const data = await restaurantSearch(searchQuery);
          if (data != null){
          setSearchResults(data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  return {
    restaurants,
    searchResults,
    isLoading,
    isError,
  };
};
