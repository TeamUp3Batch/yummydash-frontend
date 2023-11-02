import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardHeader,
  Divider,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const buttonStyle = {
  color: "white",
  backgroundColor: "#F36805",
  borderRadius: "50em",
  textTransform: "none",
  width: "100%", // Cover the width
  padding: "8px 16px", // Padding on both left and right
  textAlign: "center",
};

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        if (result.paymentIntent.status === "succeeded") {
          // Payment succeeded, redirect to the delivery page
          navigate("/delivery");
        } else {
          // Handle other cases (e.g., if payment is not succeeded)
          // You can display an error message or take appropriate actions
          console.warn("Payment not succeeded");
        }
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            style={{ fontWeight: "bold", fontSize: "14px" }}
            color="textSecondary"
            gutterBottom
          >
            Checkout
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            Pizza Palace
          </Typography>
          <Divider
            style={{ backgroundColor: "#000", height: "2px", margin: "16px 0" }}
          />
          <Grid container>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Typography variant="body1" component="div">
                8" Pepperoni Chicken Pizza
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography variant="body1" component="div">
                $13.99
              </Typography>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Typography variant="body1" component="div">
                Chicken Tandoori Pizza
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography variant="body1" component="div">
                $13.99
              </Typography>
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Typography variant="h6" component="div">
                Total
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography variant="h6" component="div">
                $27.98
              </Typography>
            </Grid>
          </Grid>
          <Divider
            style={{ backgroundColor: "#000", height: "2px", margin: "16px 0" }}
          />
          <CardElement />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            style={{
              background: "#4caf50",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default function OrderSummary() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      const url = `${apiUrl}/api/cart/placeOrder`;
      try {
        const response = await axios.post(url, { amount: 50000 });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        throw error;
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <Paper>
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </Paper>
  );
}
