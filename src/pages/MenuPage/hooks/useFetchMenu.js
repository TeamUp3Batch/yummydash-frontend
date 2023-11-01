import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRestaurantDetailsById } from "../../../services/restaurantService";
import { setRestaurantDetailsById } from "../../../slices/menuSlice";
export const useFetchMenu = ({ restaurantId }) => {
  console.log("getting restid inside here",restaurantId)
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();
  console.log("getting restid inside hello",restaurantId)

  useEffect(() => {
    console.log("getting restid inside useffect",restaurantId)
    const fetchData = async () => {
      console.log("getting fetch data")
      setIsLoading(true);
      setIsError(undefined);
      try {
        console.log("getting restid inside useffect1",restaurantId)
          console.log("getting restid inside useffect2",restaurantId)
          const data = await getRestaurantDetailsById(restaurantId);
          console.log("data is",data)
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
