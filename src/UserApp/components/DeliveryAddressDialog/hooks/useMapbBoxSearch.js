import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function useMapboxSearch() {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'orange',
      },
      mapboxgl: mapboxgl,
      // Use the bbox option to limit the search area to Canada
      bbox: [-141.00246, 41.675105, -52.648098, 83.23324],
    });

    geocoder.on('result', (event) => {
      const selectedLocation = event.result;
      setAddress(selectedLocation.place_name);
      setLatitude(selectedLocation.center[1]);
      setLongitude(selectedLocation.center[0]);
    });

    map.addControl(geocoder, 'top-left');

    return () => {
      map.remove();
    };
  }, []);

  return { address, latitude, longitude };
}

export default useMapboxSearch;
