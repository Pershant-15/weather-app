const API_KEY = import.meta.env.VITE_OWM_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export const hasApiKey = Boolean(API_KEY) && API_KEY !== 'your_key_here';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, params) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries({ ...params, appid: API_KEY }).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new ApiError('Network error. Check your internet connection and try again.', 0);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError(
        'The API key was rejected. Check VITE_OWM_API_KEY in your .env file. New keys can take up to two hours to activate.',
        401
      );
    }
    if (response.status === 404) {
      throw new ApiError('City not found. Check the spelling and try again.', 404);
    }
    if (response.status === 429) {
      throw new ApiError('Too many requests. Please wait a minute and try again.', 429);
    }
    throw new ApiError('Something went wrong while contacting the weather service.', response.status);
  }

  return response.json();
}

// Turns a city name into coordinates using the Geocoding API.
export async function geocodeCity(query) {
  const results = await request('/geo/1.0/direct', { q: query, limit: 1 });
  if (!results.length) {
    throw new ApiError('City not found. Check the spelling and try again.', 404);
  }
  const { name, country, state, lat, lon } = results[0];
  return { name, country, state, lat, lon };
}

// Always fetched in metric. The UI converts to Fahrenheit on the client,
// so toggling units never needs another network request.
export function getCurrentWeather(lat, lon) {
  return request('/data/2.5/weather', { lat, lon, units: 'metric' });
}

export function getForecast(lat, lon) {
  return request('/data/2.5/forecast', { lat, lon, units: 'metric' });
}
