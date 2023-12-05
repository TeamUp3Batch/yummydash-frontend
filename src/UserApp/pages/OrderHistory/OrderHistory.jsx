import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import { getAllOrdersByUserId } from "../../../services/cartService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OrderHistory = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const [userOrderHistories, SetUserOrderHistories] = useState([]);
  const trimDate = (date) => {
    return date.split("T")[0];
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle = {
    margin: "0",
    textAlign: "center",
  };

  useEffect(() => {
    const userId = loggedInUser._id;
    const fetchData = async () => {
      try {
        const userHistory = await getAllOrdersByUserId(userId);
        SetUserOrderHistories(userHistory);
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const UserOrderCard = ({ userOrderHistory }) => {
    return (
      <Grid item sm={4} sx={{ marginTop: "30px" }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {userOrderHistory.restaurantName}
            </Typography>
            <Divider />
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              OrderId: #{userOrderHistory._id}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              DELIVERED: {trimDate(userOrderHistory.cartCreationTime)}
            </Typography>
            <Divider />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Total: ${userOrderHistory.total}</b>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Rating
                name="read-only"
                value={userOrderHistory.restaurantRating}
                readOnly
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <br />
        <div style={divStyle}>
          <Link to="../main">
            <ArrowBackIcon />
          </Link>

          <h1 style={titleStyle}>Order History</h1>
          <Link>
            <ArrowForwardIcon />
          </Link>
        </div>

        <Grid container spacing={2}>
          {userOrderHistories.map((userOrderHistory, index) => (
            <UserOrderCard key={index} userOrderHistory={userOrderHistory} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default OrderHistory;
