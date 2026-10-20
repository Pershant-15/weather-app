import { useCallback, useState } from 'react';

const messageFor = (error) => {
  if (error.code === error.PERMISSION_DENIED) {
    return 'Location access was denied. Allow it in your browser settings, or search for a city instead.';
  }
  if (error.code === error.TIMEOUT) {
    return 'Finding your location took too long. Please try again.';
  }
  return 'Could not determine your location. Try searching for a city instead.';
};

export default function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  // Resolves with { lat, lon }, or null if the location could not be read.
  const locate = useCallback(
    () =>
      new Promise((resolve) => {
        if (!('geolocation' in navigator)) {
          setGeoError('Your browser does not support geolocation.');
          resolve(null);
          return;
        }

        setLocating(true);
        setGeoError(null);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocating(false);
            resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
          },
          (error) => {
            setLocating(false);
            setGeoError(messageFor(error));
            resolve(null);
          },
          { timeout: 10000 }
        );
      }),
    []
  );

  return { locate, locating, geoError };
}
