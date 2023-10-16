import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCuisineList } from "../../../services/restaurantService";
import { setAllCuisines } from "../../../slices/restaurantSlice";

export const useMyComponent = ({}) => {
  const [cuisineList, setCuisineList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const dispatch = useDispatch();

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        const cuisines = await getCuisineList();
        dispatch(setAllCuisines(cuisines));
        setCuisineList(cuisines);
      } catch (error) {
        console.error("Error:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return {
    cuisineList,
    selectedCuisine,
    isLoading,
    isError,
    handleCuisineClick,
  };
};
