import React, { useEffect, useState, useRef } from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import DeliveryDetailsBox from "../../components/DeliveryDetailsBox/DeliveryDetailsBox";
import classes from "./placeOrder.module.scss";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const PlaceOrder = () => {
  const { checkout } = useSelector((state) => state.menu);
  const navigate = useNavigate();
  //mapbox start
  const [viewport, setViewport] = useState({
    latitude: 52.114371, // Latitude of the marker
    longitude: -106.631472, // Longitude of the marker
    zoom: 12, // Initial zoom level
  });
  useEffect(() => {
    if (checkout && checkout.userAddress && checkout.userAddress.latitude && checkout.userAddress.longitude) {
      setViewport({
        latitude: checkout.userAddress.latitude,
        longitude: checkout.userAddress.longitude,
        zoom: 12, 
      });
    }
  }, [checkout]);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v9" // You can choose a different map style
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
        <Marker
          latitude={checkout.userAddress.latitude}
          longitude={checkout.userAddress.longitude}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        >
          <PersonPinCircleRoundedIcon/>
        </Marker>
        <Marker
          latitude={checkout.restaurantAddress.latitude}
          longitude={checkout.restaurantAddress.longitude}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        >
                  <RestaurantTwoToneIcon/>

        </Marker>
        <div className={classes.placeOrderContainer}>
          <div className={classes.deliveryDetailsBox}>
            <DeliveryDetailsBox />
          </div>
          <div className={classes.orderSummary}>
            <OrderSummary />
          </div>
        </div>
      </ReactMapGL>
    </div>
  );
};

export default PlaceOrder;