import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getOrdersCompletedByDriver } from "../../services/driverService";

import { useSelector } from "react-redux";

const FulFilledOrders = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState(null);
  const { loggedInDriver } = useSelector((state) => state.driver);

  useEffect(() => {
    const fetchData = async () => {
      const driverId = loggedInDriver._id;
      try {
        if (driverId) {
          const data = await getOrdersCompletedByDriver(driverId);
          setRestaurantOrderDetails(data.data.orders);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
  };
  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <Title>Fulfilled Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Order ID</b></TableCell>
            <TableCell><b>Customer Name</b></TableCell>
            <TableCell><b>Restaurant Name</b></TableCell>
            <TableCell><b>Pickup Address</b></TableCell>
            <TableCell><b>Delivery Address</b></TableCell>
            <TableCell><b>Order Status</b></TableCell>
            <TableCell><b>Updated Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantOrderDetails.map((restaurantOrderDetail) => (
            <TableRow key={restaurantOrderDetail._id}>
              <TableCell>{restaurantOrderDetail._id}</TableCell>
              <TableCell>
                {restaurantOrderDetail.userName.toUpperCase()}
              </TableCell>
              <TableCell>{restaurantOrderDetail.restaurantName}</TableCell>
              <TableCell>{restaurantOrderDetail.restaurantAddress}</TableCell>
              <TableCell>{restaurantOrderDetail.userAddress}</TableCell>
              <TableCell>{restaurantOrderDetail.orderStatus}</TableCell>
              <TableCell>
                {restaurantOrderDetail.orderTracker[
                  restaurantOrderDetail.orderStatus
                ]
                  ? new Date(
                      restaurantOrderDetail.orderTracker[
                        restaurantOrderDetail.orderStatus
                      ].timestamp
                    ).toLocaleString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default FulFilledOrders;
