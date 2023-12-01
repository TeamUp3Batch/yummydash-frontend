
import { useState, useEffect } from 'react';
import { 
 getTopPerformingDriver,
 getTotalOrdersDelivered,
 getTopPerformingRestaurant
} from '../../../../services/dashboardService';

export  const useTopPerformingDriver = () => {
  const [topPerformingDriver, setTopPerformingDriver] = useState(0);

  useEffect(() => {
    const fetchTopPerformingDriver = async () => {
      try {
        const topPerformance = await getTopPerformingDriver();
        setTopPerformingDriver(topPerformance);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTopPerformingDriver();
  }, []);

  return topPerformingDriver;
};

export  const useTotalOrdersDelivered = () => {
  const [totalOrdersDelivered , setTotalOrdersDelivered ] = useState(0);

  useEffect(() => {
    const fetchTotalOrdersDelivered = async () => {
      try {
        const totalOrderDelivered = await getTotalOrdersDelivered();
        setTotalOrdersDelivered(totalOrderDelivered);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalOrdersDelivered();
  }, []);

  return totalOrdersDelivered;
};

export  const useTopPerformingRestaurant = () => {
  const [topPerformingRestaurant, setTopPerformingRestaurant] = useState(0);

  useEffect(() => {
    const fetchTopPerformingRestaurant = async () => {
      try {
        const drivers = await getTopPerformingRestaurant();
        setTopPerformingRestaurant(drivers);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTopPerformingRestaurant();
  }, []);

  return topPerformingRestaurant;
};





