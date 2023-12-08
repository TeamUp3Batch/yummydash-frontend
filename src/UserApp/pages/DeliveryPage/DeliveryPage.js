import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderWhite from "../HeaderWhite/HeaderWhite";
import ReactMapGL, {
  GeolocateControl,
  Source,
  Layer,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RestaurantTwoToneIcon from "@mui/icons-material/RestaurantTwoTone";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import { useSelector } from "react-redux";

import { updateCartStatus, updateDriver } from "../../../slices/menuSlice";

import { getOrderDetailsByOrderId } from "../../../services/cartService";
import { getDriverProfile } from "../../../services/driverService";

import receptIcon from "../../../icons/receipt-svgrepo-com.svg";
import trackerIcon from "../../../icons/list-ul-alt-svgrepo-com.svg";
import circleDotIcon from "../../../icons/circle-dot-svgrepo-com.svg";
import pointerOrange from "../../../icons/pointer-map-pointer-orange.svg";
import pointerGrey from "../../../icons/pointer-map-pointer-grey.svg";
import checkCircleOrange from "../../../icons/check-circle-orange.svg";

import classes from "./deliveryPage.module.scss";
import { formattedTime } from "../../../utils/formattedTimeStamp";

import RestaurantRating from "../../components/OrderSummary/RestaurantRating/RestaurantRating";
import ConfirmModal from "../../components/OrderSummary/ConfirmModal/ConfirmModal";
const ProcessingForm = ({ clientSecret }) => {
  const dispatch = useDispatch();
  const { cartId, checkout, cart, driver } = useSelector((state) => state.menu);
  const { loggedInUser } = useSelector((state) => state.auth);
  const [tracker, setTracker] = useState(true);
  const [placed, setPlaced] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [driving, setDriving] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [delivering, setDelivering] = useState(false);
  const [orderTrackerData, setOrderTrackerData] = useState("");
  const [driverName, setDriverName] = useState("");
  const [confirmRatingActive, setConfirmRatingActive] = useState(false);
  const [confirmModalActive, setConfirmModalActive] = useState(false);
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const userId = loggedInUser._id;
      try {
        const data = await getOrderDetailsByOrderId(userId, cartId);
        const { orderTracker } = data;
        const { orderStatus } = data;
        setOrderTrackerData(data);
        dispatch(updateCartStatus(orderStatus));

        // Check orderTracker status and update state accordingly
        if (
          orderTracker &&
          orderTracker.delivery &&
          orderTracker.delivery.status
        ) {
          setPlaced(true);
          setConfirmed(true);
          setConfirmModalActive(false);
          setDriving(true);
          setCollecting(true);
          setDelivering(true);
          setConfirmRatingActive(true);
        }

        if (orderTracker && orderTracker.pickup && orderTracker.pickup.status) {
          setPlaced(true);
          setConfirmed(true);
          setConfirmModalActive(false);
          setDriving(true);
          setCollecting(true);
        }

        
        if (orderTrackerData.driverId) {
          const driverDetails = await getDriverProfile(
            orderTrackerData.driverId
          );
          if (driverDetails) {
            setDriverName(driverDetails.data.driverProfile.firstName);
            dispatch(updateDriver(driverDetails.data.driverProfile.firstName));
          }
        }

        if (orderTracker && orderTracker.ready && orderTracker.ready.status) {
          setPlaced(true);
          setConfirmed(true);
          setConfirmModalActive(false);
          setPreparing(false);
          setDriving(true);
          setConfirmModalActive(false);
        }

        if (
          orderTracker &&
          orderTracker.preparation &&
          orderTracker.preparation.status
        ) {
          setPlaced(true);
          setConfirmed(true);
          setConfirmModalActive(false);
          setPreparing(true);
        }

        if (
          !isConfirmPressed &&
          cart.orderStatus != "acceptance" &&
          orderTracker &&
          orderTracker.acceptance &&
          orderTracker.acceptance.status &&
          orderStatus != "preparation"
        ) {
          setPlaced(true);
          setConfirmed(true);
          setConfirmModalActive(true);
          setIsConfirmPressed(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrderStatus();
    const intervalId = setInterval(fetchOrderStatus, 10000);

    // Clean up the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, [cartId, loggedInUser._id, isConfirmPressed, orderTrackerData.driverId]);

  return (
    <div className={classes.processingForm}>
      <div className={classes.processingForm__wrapper}>
        <div className={classes.processingForm__header}>
          { preparing && cart.orderStatus == "preparation" && cart.orderStatus !== "pickup" ? (
            <h2>
            {checkout.restaurantName}
            <span> is preparing your order</span>
          </h2>
          ) : (
            <h2>
              {checkout.restaurantName}
            </h2>
          )}
        </div>
        {tracker ? (
          <>
            <div className={classes.processingForm__main}>
              <div className={classes.processingForm__switch}>
                <h2>Tracker</h2>
                <div>
                  <button onClick={() => setTracker(true)}>
                    <img src={trackerIcon} alt="tracker" width="20px" />
                  </button>
                  <button onClick={() => setTracker(false)}>
                    <img src={receptIcon} alt="receipt" width="20px" />
                    <span className={classes.receptIcon__tooltip}>Receipt</span>
                  </button>
                </div>
              </div>

              <div>
                {placed ? (
                  <div className={classes.processingForm__table}>
                    <img
                      src={checkCircleOrange}
                      alt="CircleIcon"
                      width="20px"
                    />
                    <p className={classes.processingForm__work}>
                      <b>Order placed</b>
                    </p>
                    <p className={classes.processingForm__time}>
                      {formattedTime(cart.orderTracker.payment.timestamp)}
                    </p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Order placed</p>
                  </div>
                )}

                {confirmed ? (
                  <div className={classes.processingForm__table}>
                    <img
                      src={checkCircleOrange}
                      alt="CircleIcon"
                      width="20px"
                    />
                    <p className={classes.processingForm__work}>
                      <b>Order confirmed</b>
                    </p>
                    <p className={classes.processingForm__time}>
                      {formattedTime(
                        orderTrackerData.orderTracker.acceptance.timestamp
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Order confirmed</p>
                  </div>
                )}

                {driving ? (
                  <div className={classes.processingForm__table}>
                    <img
                      src={checkCircleOrange}
                      alt="CircleIcon"
                      width="20px"
                    />
                    <p className={classes.processingForm__work}>
                      <b>Arrived At Restaurant</b>
                    </p>
                    <p className={classes.processingForm__time}>
                      {formattedTime(
                        orderTrackerData.orderTracker.ready.timestamp
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Driving to restaurant</p>
                  </div>
                )}

                {collecting ? (
                  <div className={classes.processingForm__table}>
                    <img
                      src={checkCircleOrange}
                      alt="CircleIcon"
                      width="20px"
                    />
                    <p className={classes.processingForm__work}>
                      <b>Driver {driver} is Collecting your order</b>
                    </p>
                    <p className={classes.processingForm__time}>
                      {formattedTime(
                        orderTrackerData.orderTracker.pickup.timestamp
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Collecting your order</p>
                  </div>
                )}

                {delivering ? (
                  <div className={classes.processingForm__table}>
                    <img
                      src={pointerOrange}
                      alt="Pointer Delivery"
                      width="20px"
                    />
                    <p className={classes.processingForm__work}>
                      <b> {delivering ? <span>{driver} has arrived with your food</span> : <div></div>}</b>
                    </p>
                    <p className={classes.processingForm__time}>
                      {formattedTime(
                        orderTrackerData.orderTracker.delivery.timestamp
                      )}
                    </p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img
                      src={pointerGrey}
                      alt="Pointer Delivery"
                      width="20px"
                    />
                    <p>Delivering your order</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={classes.processingForm__main}>
              <div className={classes.processingForm__switch}>
                <h2>Receipt</h2>
                <div>
                  <button onClick={() => setTracker(true)}>
                    <img src={trackerIcon} alt="tracker" width="20px" />
                    <span className={classes.trackerIcon__tooltip}>
                      Tracker
                    </span>
                  </button>
                  <button onClick={() => setTracker(false)}>
                    <img src={receptIcon} alt="receipt" width="20px" />
                  </button>
                </div>
                <span className={classes.trackerIcon__tooltip}>Tracker</span>
              </div>
              {checkout
                ? checkout.lineItems.map((lineItem) => (
                    <>
                      <div className={classes.processingForm__dishes}>
                        <p className={classes.processingForm__quantity}>
                          {lineItem.quantity}
                        </p>
                        <p className={classes.processingForm__name}>
                          {lineItem.name}
                        </p>
                        <p className={classes.processingForm__price}>
                          ${lineItem.price}
                        </p>
                      </div>
                    </>
                  ))
                : null}
              <div className={classes.processingForm__total}>
                <h2>Total</h2>
                <h2>${checkout.totalprice}</h2>
              </div>
            </div>
          </>
        )}
      </div>
      <RestaurantRating
        active={confirmRatingActive}
        setActive={setConfirmRatingActive}
        cartId={cartId}
        userId={checkout.userId}
        restaurantId={checkout.restaurantId}
        restaurantName={checkout.restaurantName}
        driverId={orderTrackerData.driverId}
        driverName={driver}
      />
      <ConfirmModal
        active={confirmModalActive}
        setActive={setConfirmModalActive}
      />
    </div>
  );
};

const DeliveryPage = () => {
  const { checkout } = useSelector((state) => state.menu);
  const [confirmRatingActive, setConfirmRatingActive] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: checkout?.userAddress?.longitude || -106.659733,
    latitude: checkout?.userAddress?.latitude || 52.134574,
    zoom: 15,
    dragPan: true, // Enable drag pan
  });
  // const [start, setStart] = useState([-106.575897, 52.145776]);
  // const [end, setEnd] = useState([-106.659733, 52.134574]);
  const [start, setStart] = useState([
    checkout?.restaurantAddress?.longitude,
    checkout?.restaurantAddress?.latitude,
  ]);
  const [end, setEnd] = useState([
    checkout?.userAddress?.longitude,
    checkout?.userAddress?.latitude,
  ]);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getRoutes();
  }, [end, start]);

  const getRoutes = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&language=en&overview=full&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
      );

      const data = await response.json();
      const coords = data.routes[0].geometry.coordinates;
      setCoords(coords);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
  };

  const lineStyle = {
    id: "roadLayer",
    type: "line",
    paint: {
      "line-color": "blue",
      "line-width": 4,
    },
  };

  const handleZoom = (event) => {
    const newZoom = viewState.zoom + event.deltaY / 100;
    setViewState((prevViewState) => ({
      ...prevViewState,
      zoom: newZoom,
    }));
  };

  return (
    <div onWheel={handleZoom}>
      <HeaderWhite />
      {/* <div>DeliveryPage</div> */}

      <ReactMapGL
        {...viewState}
        style={{ height: "100vh", width: "100vw" }}
        onViewportChange={(nextViewState) => setViewState(nextViewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
        <ProcessingForm />
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...lineStyle} />
        </Source>

        {/* Marker for Start Point */}
        <Marker longitude={start[0]} latitude={start[1]}>
          <RestaurantTwoToneIcon />
        </Marker>

        {/* Marker for End Point */}
        <Marker longitude={end[0]} latitude={end[1]}>
          <PersonPinCircleRoundedIcon />
        </Marker>

        {/* //Marker for End of Route Line */}
        {/* {coords.length > 0 && (
          <Marker longitude={coords[coords.length - 1][0]} latitude={coords[coords.length - 1][1]}>
            <PersonPinCircleRoundedIcon />
          </Marker>
        )} */}

        <GeolocateControl />
      </ReactMapGL>

      {/* <RestaurantRating active={confirmRatingActive} setActive={setconfirmRatingActive} /> */}
    </div>
  );
};

export default DeliveryPage;
