
import { useState, useEffect } from 'react';
import { 
  getSalesPerWeek ,
  getSalesPerMonth,
} from '../../../../services/dashboardService';
export  const useSalesPerWeek = () => {
    const [salesPerWeek, setSalesPerWeek] = useState(0);
  
    useEffect(() => {
      const fetchSalesPerWeek = async () => {
        try {
          const sales = await getSalesPerWeek();
          setSalesPerWeek(sales);
        } catch (error) {
          console.error('Error fetching total users:', error);
        }
      };
  
      fetchSalesPerWeek();
    }, []);
  
    return salesPerWeek;
  };
  
  export  const useSalesPerMonth = () => {
    const [salesPerMonth, setSalesPerMonth] = useState(0);
  
    useEffect(() => {
      const fetchSalesPerMonth = async () => {
        try {
          const sales = await getSalesPerMonth();
          setSalesPerMonth(sales);
        } catch (error) {
          console.error('Error fetching total users:', error);
        }
      };
  
      fetchSalesPerMonth();
    }, []);
  
    return salesPerMonth;
  };
  