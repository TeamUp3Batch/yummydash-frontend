import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { Button, Paper } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import ConfirmModal from './ConfirmModal/ConfirmModal';

import classes from './orderSummary.module.scss';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CheckoutForm = ({ clientSecret }) => {
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const { checkout } = useSelector((state) => state.menu);
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
        if (result.paymentIntent.status === 'succeeded') {
          // Payment succeeded, redirect to the delivery page
          //navigate('/delivery');
          setConfirmModalActive(true);
        } else {
          // Handle other cases (e.g., if payment is not succeeded)
          // You can display an error message or take appropriate actions
          console.warn('Payment not succeeded');
        }
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
    
    {/* Order Summary */}
      <div className={classes.orderSummary}>
        <div className={classes.orderSummary__wrapper}>
          <div className={classes.orderSummary__header}>
            <h2>Checkout</h2>
          </div>
          <div className={classes.orderSummary__main}>
            <h3>{checkout.restaurantName}</h3>

            {checkout
              ? checkout.lineItems.map((lineItem) => (
                  <div className={classes.orderSummary__dishes}>
                    <p className={classes.orderSummary__quantity}>{lineItem.quantity}</p>
                    <p className={classes.orderSummary__name}>{lineItem.name}</p>
                    <p className={classes.orderSummary__price}>${lineItem.price}</p>
                  </div>
                ))
              : null}
          </div>
          <div className={classes.orderSummary__checkout}>
            <CardElement />
            <Button onClick={handleCheckout}>
              <h3>Checkout</h3>
            </Button>
          </div>
        </div>
      </div>

      {/* Processing orders */}
      {/* <div className={classes.processing}>
        <div className={classes.processing__wrapper}>
          <div className={classes.processing__header}>
            <h2>{checkout.restaurantName} <span>is preparing your order:</span></h2>
            <h2>Receipt</h2>
          </div>
          <div className={classes.processing__main}>

            {checkout
              ? checkout.lineItems.map((lineItem) => (
                  <div className={classes.processing__dishes}>
                    <p className={classes.processing__quantity}>{lineItem.quantity}</p>
                    <p className={classes.processing__name}>{lineItem.name}</p>
                    <p className={classes.processing__price}>${lineItem.price}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div> */}
      <ConfirmModal active={confirmModalActive} setActive={setConfirmModalActive}/>
    </div>
  );
};

export default function OrderSummary() {
  const [clientSecret, setClientSecret] = useState('');

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
