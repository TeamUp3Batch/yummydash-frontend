import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { useFetchRestaurants } from "./hooks/useFetchRestaurants";

const RestaurantList = ({ selectedCuisine, selectedSort, searchQuery }) => {
  const { restaurants, searchResults, isLoading, isError } =
    useFetchRestaurants({
      selectedCuisine,
      selectedSort,
      searchQuery,
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
  if (searchResults.restaurants) {
    return (
      <div>
        <h1>Search Results</h1>
        {searchResults.restaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <RestaurantCard cardDetails={restaurant} />
          </div>
        ))}
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
