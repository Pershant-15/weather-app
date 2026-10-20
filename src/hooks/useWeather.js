import { useCallback, useRef, useState } from 'react';
import { geocodeCity, getCurrentWeather, getForecast } from '../api/weatherApi.js';
import { summarizeForecast } from '../utils/formatters.js';

const INITIAL = { status: 'idle', current: null, forecast: [], error: null };

export default function useWeather() {
  const [state, setState] = useState(INITIAL);
  // Every search gets an id. If a newer search starts before an older one
  // finishes, the older result is ignored instead of overwriting the screen.
  const latestRequest = useRef(0);

  const startRequest = () => {
    latestRequest.current += 1;
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    return latestRequest.current;
  };

  const fail = (requestId, message) => {
    if (requestId !== latestRequest.current) return null;
    setState({ status: 'error', current: null, forecast: [], error: message });
    return null;
  };

  const fetchWeather = useCallback(async (requestId, lat, lon, knownPlace) => {
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);
      if (requestId !== latestRequest.current) return null;

      setState({
        status: 'success',
        current,
        forecast: summarizeForecast(forecast.list, forecast.city.timezone),
        error: null,
      });

      // Returned so the caller can save it to the search history.
      return (
        knownPlace ?? {
          name: current.name,
          country: current.sys.country,
          lat,
          lon,
        }
      );
    } catch (error) {
      return fail(requestId, error.message);
    }
  }, []);

  const loadByCity = useCallback(
    async (query) => {
      const requestId = startRequest();
      try {
        const place = await geocodeCity(query);
        if (requestId !== latestRequest.current) return null;
        return await fetchWeather(requestId, place.lat, place.lon, {
          name: place.name,
          country: place.country,
          lat: place.lat,
          lon: place.lon,
        });
      } catch (error) {
        return fail(requestId, error.message);
      }
    },
    [fetchWeather]
  );

  const loadByCoords = useCallback(
    (lat, lon, knownPlace) => fetchWeather(startRequest(), lat, lon, knownPlace),
    [fetchWeather]
  );

  const showError = useCallback((message) => {
    latestRequest.current += 1;
    setState({ status: 'error', current: null, forecast: [], error: message });
  }, []);

  return { ...state, loadByCity, loadByCoords, showError };
}
