import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardHeader,
  Divider,
} from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
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
        console.log("result", result);
        navigate("/delivery");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <Card>
        <CardContent style={{ textAlign: "center" }}>
          <CardHeader title="Checkout" />
          Client Secret: {clientSecret}
          <Typography variant="body2">Subway</Typography>
          <Divider />
          <Typography variant="body2">Green Goddess</Typography>
          <CardElement />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            style={buttonStyle}
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
  const navigate = useNavigate();

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
