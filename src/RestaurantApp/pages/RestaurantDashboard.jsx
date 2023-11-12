import React, { useState, useEffect } from "react";
import { getAllOrdersByRestaurantId } from "../../services/cartService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import RestuarantHeader from '../components/RestaurantHeader/RestaurantHeader';

const RestaurantHomePage = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const restaurantId = '6527a6e0fdb8bf79ffc03c4f';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrdersByRestaurantId(restaurantId);
        
        setRestaurantOrderDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  return (
    <div>
      <RestuarantHeader />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            marginLeft: 200,
            marginTop: 50,
            transition: 'margin 0.3s',
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Menu Item</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {restaurantOrderDetails.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>
                      {order.menuItems.map((menuItem) => (
                        <div key={menuItem._id}>
                          {menuItem.name} - {menuItem.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
export default RestaurantHomePage;
