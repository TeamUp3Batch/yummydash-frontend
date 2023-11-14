import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Title from "../RestaurantTitle";

const RestaurantMenu = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([
    // Initial order details
    // ...
  ]);

  

  const handleAddItem = () => {
    // Add a new item to the state when the "Add Item" button is clicked
    const newOrderDetails = [...restaurantOrderDetails];
    const newOrder = {
      _id: Math.random().toString(), // Generate a unique ID for the new order (replace with your logic)
      userId: 'newUserId', // Replace with actual user ID
      menuItems: [{ name: 'New Item', quantity: 1 }], // Initial new item
      total: 0, // Replace with actual total calculation logic
      orderStatus: 'Pizza', // Replace with actual order status
    };

    newOrderDetails.push(newOrder);
    setRestaurantOrderDetails(newOrderDetails);
  };

  return (
    <div>
    <Title>Menu</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Menu ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
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
                  <div key={menuItem.name}>
                    {menuItem.name} - {menuItem.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                <Button>
                 <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddItem}>
        Add Item
      </Button>
    </div>
  );
};

export default RestaurantMenu;
