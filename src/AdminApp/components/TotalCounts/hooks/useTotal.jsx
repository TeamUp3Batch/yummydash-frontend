import { useState, useEffect } from "react";
import {
  getTotalUsers,
  getTotalRestaurants,
  getTotalDrivers,
} from "../../../../services/dashboardService";

export const useTotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const users = await getTotalUsers();
        setTotalUsers(users);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return totalUsers;
};

export const useTotalRestaurants = () => {
  const [totalRestaurant, setTotalRestaurant] = useState(0);

  useEffect(() => {
    const fetchTotalRestaurants = async () => {
      try {
        const restaurants = await getTotalRestaurants();
        setTotalRestaurant(restaurants);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalRestaurants();
  }, []);

  return totalRestaurant;
};

export const useTotalDrivers = () => {
  const [totalDrivers, setTotalDrivers] = useState(0);

  useEffect(() => {
    const fetchTotalDrivers = async () => {
      try {
        const drivers = await getTotalDrivers();
        setTotalDrivers(drivers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalDrivers();
  }, []);

  return totalDrivers;
};
