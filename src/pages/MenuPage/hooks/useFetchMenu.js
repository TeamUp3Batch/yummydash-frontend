import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRestaurantDetailsById } from "../../../services/restaurantService";
import { setRestaurantDetailsById } from "../../../slices/menuSlice";
export const useFetchMenu = ({ restaurantId }) => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
          const data = await getRestaurantDetailsById(restaurantId);
          dispatch(setRestaurantDetailsById({ id: restaurantId, data }));
          setRestaurantDetails(data);
      } catch (error) {
        console.error("Error:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    restaurantDetails,
    isLoading,
    isError,
  };
};
