import { useCallback, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MountainBackground from './components/MountainBackground.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchHistory from './components/SearchHistory.jsx';
import UnitToggle from './components/UnitToggle.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import ForecastList from './components/ForecastList.jsx';
import Loader from './components/Loader.jsx';
import ErrorAlert from './components/ErrorAlert.jsx';
import useWeather from './hooks/useWeather.js';
import useGeolocation from './hooks/useGeolocation.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import { hasApiKey } from './api/weatherApi.js';

const MAX_HISTORY = 6;
const samePlace = (a, b) =>
  a.name.toLowerCase() === b.name.toLowerCase() && a.country === b.country;

export default function App() {
  // State lives here, in the parent, and flows down to the components that need it.
  const [unit, setUnit] = useLocalStorage('weather-unit', 'metric');
  const [history, setHistory] = useLocalStorage('weather-history', []);

  const weather = useWeather();
  const { locate, locating, geoError } = useGeolocation();

  const addToHistory = useCallback(
    (place) => {
      if (!place) return;
      setHistory((prev) =>
        [place, ...prev.filter((item) => !samePlace(item, place))].slice(0, MAX_HISTORY)
      );
    },
    [setHistory]
  );

  const handleSearch = async (city) => {
    addToHistory(await weather.loadByCity(city));
  };

  const handleSelectHistory = async (place) => {
    addToHistory(await weather.loadByCoords(place.lat, place.lon, place));
  };

  const handleLocate = async () => {
    const coords = await locate();
    if (coords) addToHistory(await weather.loadByCoords(coords.lat, coords.lon));
  };

  const handleRemove = (place) =>
    setHistory((prev) => prev.filter((item) => !samePlace(item, place)));

  // On first load, show the most recently viewed place if there is one.
  const didInitialLoad = useRef(false);
  useEffect(() => {
    if (didInitialLoad.current || !hasApiKey) return;
    didInitialLoad.current = true;
    if (history.length > 0) {
      const [latest] = history;
      weather.loadByCoords(latest.lat, latest.lon, latest);
    }
    // Runs once on mount, on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = weather.status === 'loading';

  return (
    <>
      <MountainBackground />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: { xs: 3, sm: 5 } }}>
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LandscapeIcon color="primary" sx={{ fontSize: 36 }} />
            <Typography variant="h5" component="h1" fontWeight={700}>
              Summit Weather
            </Typography>
          </Box>
          <UnitToggle unit={unit} onChange={setUnit} />
        </Box>

        {!hasApiKey && (
          <Box sx={{ mb: 3 }}>
            <ErrorAlert
              severity="warning"
              title="API key missing"
              message="Copy .env.example to .env, paste your free OpenWeatherMap key as VITE_OWM_API_KEY, then restart the dev server."
            />
          </Box>
        )}

        <SearchBar
          onSearch={handleSearch}
          onLocate={handleLocate}
          disabled={!hasApiKey || isLoading}
          locating={locating}
        />

        <SearchHistory
          history={history}
          onSelect={handleSelectHistory}
          onRemove={handleRemove}
          onClear={() => setHistory([])}
        />

        {geoError && (
          <Box sx={{ mb: 3 }}>
            <ErrorAlert severity="warning" title="Location unavailable" message={geoError} />
          </Box>
        )}

        {/* Conditional rendering: exactly one of these shows at a time. */}
        {isLoading && <Loader />}

        {weather.status === 'error' && <ErrorAlert message={weather.error} />}

        {weather.status === 'success' && (
          <Box sx={{ display: 'grid', gap: 2 }}>
            <WeatherCard current={weather.current} unit={unit} />
            <WeatherDetails current={weather.current} unit={unit} />
            <ForecastList
              forecast={weather.forecast}
              unit={unit}
              timezone={weather.current.timezone}
            />
          </Box>
        )}

        {weather.status === 'idle' && hasApiKey && (
          <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
              Where to?
            </Typography>
            <Typography>
              Search for a city or use your location to see the weather.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
