import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import ReactMapGL, { GeolocateControl, Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RestaurantTwoToneIcon from "@mui/icons-material/RestaurantTwoTone";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import { useSelector } from "react-redux";

const DeliveryPage = () => {
  const { checkout } = useSelector((state) => state.menu);
  const [viewState, setViewState] = useState({
    longitude: -106.659733,
    latitude: 52.134574,
    zoom: 15,
    dragPan: true, // Enable drag pan
  });
  // const [start, setStart] = useState([-106.575897, 52.145776]);
  // const [end, setEnd] = useState([-106.659733, 52.134574]);
  const [start, setStart] = useState([checkout?.restaurantAddress?.longitude, checkout?.restaurantAddress?.latitude]);
  const [end, setEnd] = useState([checkout?.userAddress?.longitude, checkout?.userAddress?.latitude]);
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
      <Header />
      <div>DeliveryPage</div>
      <ReactMapGL
        {...viewState}
        style={{ height: "100vh", width: "100vw" }}
        onViewportChange={(nextViewState) => setViewState(nextViewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
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
