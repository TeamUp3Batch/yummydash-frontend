import React, { useEffect, useState, useRef } from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import DeliveryDetailsBox from "../../components/DeliveryDetailsBox/DeliveryDetailsBox";
import classes from "./placeOrder.module.scss";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Order = () => {
  //mapbox start
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-106.659720);
  const [lat, setLat] = useState(52.134570);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  //mapbox end

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container">
        <div className={classes.placeOrderContainer}>
          <div className={classes.deliveryDetailsBox}>
            <DeliveryDetailsBox />
          </div>
          <div className={classes.orderSummary}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
