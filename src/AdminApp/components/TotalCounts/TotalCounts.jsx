import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import {
  useTotalUsers,
  useTotalRestaurants,
  useTotalDrivers,
} from "./hooks/useTotal";

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
  const users = useTotalUsers();
  const restaurants = useTotalRestaurants();
  const drivers = useTotalDrivers();

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
        <VibrantCard elevation={0}>
          <TitleContainer>
            <h4>Total Customer</h4>
          </TitleContainer>
          <CardContent>
            <GroupAddIcon style={{ fontSize: 24, color: "#ff8c00" }} />
            <h4> Users </h4>
            <h4>{users.totalUsers}</h4>
          </CardContent>
        </VibrantCard>
        <VibrantCard elevation={0}>
          <TitleContainer>
            <h4>Total Partners</h4>
          </TitleContainer>
          <CardContent>
            <StorefrontIcon style={{ fontSize: 24, color: "#ff8c00" }} />
            <h4>Partners</h4>
            <h4>{restaurants.totalRestaurants}</h4>
          </CardContent>
        </VibrantCard>
        <VibrantCard elevation={0}>
          <TitleContainer>
            <h4>Total Drivers</h4>
          </TitleContainer>
          <CardContent>
            <TimeToLeaveIcon style={{ fontSize: 24, color: "#ff8c00" }} />
            <h4>Drivers</h4>
            <h4>{drivers.totalDrivers}</h4>
          </CardContent>
        </VibrantCard>
      </Box>
    </Paper>
  );
}
