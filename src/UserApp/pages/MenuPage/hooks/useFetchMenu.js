import { useEffect, useState } from "react";
import { getRestaurantDetailsById } from "../../../../services/restaurantService";
export const useFetchMenu = ({ restaurantId }) => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        console.log("restaurantId",restaurantId)
          const data = await getRestaurantDetailsById(restaurantId);
          console.log("data here",data)
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
