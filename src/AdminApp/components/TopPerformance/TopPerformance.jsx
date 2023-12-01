import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import {
  useTopPerformingDriver,
  useTotalOrdersDelivered,
  useTopPerformingRestaurant,
} from "./hooks/useTopPerformance";

const VibrantCard = styled(Card)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  textAlign: "center",
  width: 300,
  height: 150,
  margin: "0.5rem",
  position: "relative",
  borderRadius: "1rem",
  border: "1px solid #ff8c00",
  "&:hover": {
    boxShadow: theme.shadows[5],
    transition: "box-shadow 0.3s ease-in-out",
  },
}));

const TitleContainer = styled("div")({
  top: "12px",
  left: "12px",
  background: "linear-gradient(to right, #ff8c00, #ffd700)",
  padding: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

export default function Statistics() {
  const topPerformanceDriver = useTopPerformingDriver();
  const totalOrders = useTotalOrdersDelivered();
  const topPerformingRestaurant = useTopPerformingRestaurant();


  return (
    <Paper elevation={3} sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            flex: 1,
          },
          "& > :not(style):not(:last-child)": {
            marginRight: "1rem",
          },
        }}
      >
        {topPerformanceDriver &&
          topPerformanceDriver.topDriver.map((driver) => (
            <VibrantCard elevation={0} key={driver._id}>
              <TitleContainer>
                <h4>Top Performance Driver </h4>
              </TitleContainer>
              <CardContent>
                <h4>
                  Name: {driver.firstName} {driver.lastName}
                </h4>
                <h4>Email: {driver.email}</h4>
                <h4>Phone: {driver.phoneNumber}</h4>
                <h4>Orders Delivered: {driver.ordersDelivered}</h4>
                <h4>User Rating: {driver.userRating}</h4>
              </CardContent>
            </VibrantCard>
          ))}
        {totalOrders && (
          <VibrantCard elevation={0}>
            <TitleContainer>
              <h4>Total Orders </h4>
            </TitleContainer>
            <CardContent>
              <h4> Total Order Delivered: {totalOrders.OrdersDelivered}</h4>
            </CardContent>
          </VibrantCard>
        )}
        {topPerformingRestaurant &&
          topPerformingRestaurant.topRestaurant.map((restaurant) => (
            <VibrantCard elevation={0} key={restaurant._id}>
              <TitleContainer>
                <h4>Top Performance Restaurant </h4>
              </TitleContainer>
              <CardContent>
                <h4>Restaurant Name: {restaurant.restaurantName}</h4>
                <h4>Total Orders : {restaurant.totalOrders}</h4>
              </CardContent>
            </VibrantCard>
          ))}
      </Box>
    </Paper>
  );
}
