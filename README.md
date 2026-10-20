# Summit Weather

A dark-themed React weather app built with Material UI and the OpenWeatherMap API. Flat solid colors, no gradients, with a layered mountain scene as the background.

## Features

- Search any city (OpenWeatherMap Geocoding API)
- Current conditions: temperature, feels like, humidity, wind, pressure, visibility, cloud cover, sunrise and sunset in the city's local time
- 5-day forecast with highs, lows, and chance of rain
- °C / °F toggle (instant, no refetch) that is remembered between visits
- "Use my location" button (browser geolocation)
- Search history, saved in `localStorage`
- Loading skeletons and clear error messages

## Getting started

You need Node.js 18 or newer.

1. Get a free API key at https://home.openweathermap.org/api_keys
   (a new key can take up to two hours to activate).
2. Install and configure:

   ```bash
   npm install
   cp .env.example .env
   ```

3. Open `.env` and replace `your_key_here` with your key:

   ```
   VITE_OWM_API_KEY=your_real_key
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

If you change `.env`, stop and restart the dev server.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
weather-app/
├── curriculum/                  # 6 modules + final assessment
├── src/
│   ├── api/weatherApi.js        # geocoding, current weather, forecast
│   ├── components/
│   │   ├── MountainBackground.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchHistory.jsx
│   │   ├── UnitToggle.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── WeatherDetails.jsx
│   │   ├── ForecastList.jsx
│   │   ├── ForecastItem.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorAlert.jsx
│   ├── hooks/
│   │   ├── useWeather.js
│   │   ├── useGeolocation.js
│   │   └── useLocalStorage.js
│   ├── theme/darkTheme.js
│   ├── utils/formatters.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## A note on the API key

Anything bundled into a browser app can be read by its users. Keeping the key in `.env` stops it from being committed to Git, but it is still visible in the built site. That is fine for learning and free-tier projects. For a production app, call the API from a small server and keep the key there.

## Curriculum

The `curriculum/` folder walks through building this app in six modules:

1. MUI setup and controlled forms
2. API integration and async code
3. Component architecture
4. State lifting and custom hooks
5. Conditional UI rendering
6. Units, forecast data, and visual polish

It ends with a final assessment: an extended dashboard capstone.
