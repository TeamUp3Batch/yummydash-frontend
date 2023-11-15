import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ReactMapGL, { GeolocateControl, Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import { useSelector } from 'react-redux';

import receptIcon from '../../../icons/receipt-svgrepo-com.svg';
import trackerIcon from '../../../icons/list-ul-alt-svgrepo-com.svg';
import circleDotIcon from '../../../icons/circle-dot-svgrepo-com.svg';
import pointerOrange from '../../../icons/pointer-map-pointer-orange.svg';
import pointerGrey from '../../../icons/pointer-map-pointer-grey.svg';
import checkCircleOrange from '../../../icons/check-circle-orange.svg';

import classes from './deliveryPage.module.scss';

const ProcessingForm = ({ clientSecret }) => {
  const { checkout } = useSelector((state) => state.menu);
  const [tracker, setTracker] = useState(true);
  const [placed, setPlaced] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [driving, setDriving] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [delivering, setDelivering] = useState(false);

  return (
    <div className={classes.processingForm}>
      <div className={classes.processingForm__wrapper}>
        <div className={classes.processingForm__header}>
          <h2>
            {checkout.restaurantName} <span>is preparing your order:</span>
          </h2>
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
                    <img src={checkCircleOrange} alt="CircleIcon" width="20px" />
                    <p className={classes.processingForm__work}>
                      <b>Order placed</b>
                    </p>
                    <p className={classes.processingForm__time}>3:45 PM</p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Order placed</p>
                  </div>
                )}

                {confirmed ? (
                  <div className={classes.processingForm__table}>
                    <img src={checkCircleOrange} alt="CircleIcon" width="20px" />
                    <p className={classes.processingForm__work}>
                      <b>Order confirmed</b>
                    </p>
                    <p className={classes.processingForm__time}>3:45 PM</p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Order confirmed</p>
                  </div>
                )}

                {driving ? (
                  <div className={classes.processingForm__table}>
                    <img src={checkCircleOrange} alt="CircleIcon" width="20px" />
                    <p className={classes.processingForm__work}>
                      <b>Driving to restaurant</b>
                    </p>
                    <p className={classes.processingForm__time}>3:45 PM</p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Driving to restaurant</p>
                  </div>
                )}

                {collecting ? (
                  <div className={classes.processingForm__table}>
                    <img src={checkCircleOrange} alt="CircleIcon" width="20px" />
                    <p className={classes.processingForm__work}>
                      <b>Collecting your order</b>
                    </p>
                    <p className={classes.processingForm__time}>3:45 PM</p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={circleDotIcon} alt="CircleIcon" width="20px" />
                    <p>Collecting your order</p>
                  </div>
                )}

                {delivering ? (
                  <div className={classes.processingForm__table}>
                    <img src={pointerOrange} alt="Pointer Delivery" width="20px" />
                    <p className={classes.processingForm__work}>
                      <b>Delivering your order</b>
                    </p>
                    <p className={classes.processingForm__time}>3:45 PM</p>
                  </div>
                ) : (
                  <div className={classes.processingForm__table}>
                    <img src={pointerGrey} alt="Pointer Delivery" width="20px" />
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
                    <span className={classes.trackerIcon__tooltip}>Tracker</span>
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
                        <p className={classes.processingForm__quantity}>{lineItem.quantity}</p>
                        <p className={classes.processingForm__name}>{lineItem.name}</p>
                        <p className={classes.processingForm__price}>${lineItem.price}</p>
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
    </div>
  );
};

const DeliveryPage = () => {
  const { checkout } = useSelector((state) => state.menu);
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
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&language=en&overview=full&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
      );

      const data = await response.json();
      const coords = data.routes[0].geometry.coordinates;
      setCoords(coords);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coords,
    },
  };

  const lineStyle = {
    id: 'roadLayer',
    type: 'line',
    paint: {
      'line-color': 'blue',
      'line-width': 4,
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
      <Header />
      {/* <div>DeliveryPage</div> */}

      <ReactMapGL
        {...viewState}
        style={{ height: '100vh', width: '100vw' }}
        onViewportChange={(nextViewState) => setViewState(nextViewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}>
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
    </div>
  );
};

export default DeliveryPage;
