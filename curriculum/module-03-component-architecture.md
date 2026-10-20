# Module 3: Component Architecture

**Duration:** about 90 minutes
**Files you will touch:** everything in `src/components/`, `src/utils/formatters.js`

## Learning objectives

By the end of this module, learners can:

- Break a screen into small, single-purpose components.
- Pass data down with props and keep components free of fetching logic.
- Move formatting logic into pure utility functions.
- Lay out cards with MUI `Card`, `Box`, and CSS grid.

## Instructor script

**1. Start from the picture (10 min).** Show the finished UI and draw boxes around each region.

```
App
├── MountainBackground
├── Header (title + UnitToggle)
├── SearchBar
├── SearchHistory
└── results
    ├── WeatherCard      (city, big temperature, icon)
    ├── WeatherDetails   (humidity, wind, pressure, tiles)
    └── ForecastList
        └── ForecastItem (one per day)
```

"Each box becomes a component. A good component does one job and you can describe it in one sentence."

**2. Props are function arguments (15 min).**

```jsx
<WeatherCard current={weather.current} unit={unit} />
```

"`WeatherCard` does not know where the data came from. It could come from an API, a test, or a mock. That is what makes it reusable."

**3. Presentational components (25 min).** Open `WeatherCard.jsx`. Point out that it has no `useState`, no `useEffect`, and no `fetch`. It receives data and returns UI.

**4. Pure formatting helpers (20 min).** Open `src/utils/formatters.js`.

```js
export const toDisplayTemp = (celsius, unit) =>
  Math.round(unit === 'metric' ? celsius : (celsius * 9) / 5 + 32);
```

"This function takes input and returns output. No React, no side effects. That makes it trivial to test."

Run a live test in Node to prove it:

```js
toDisplayTemp(0, 'imperial')   // 32
toDisplayTemp(100, 'imperial') // 212
```

**5. Layout with CSS grid (15 min).** Show the responsive grid used in `WeatherDetails.jsx`:

```jsx
gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }
```

"MUI's `sx` prop accepts breakpoints. Two columns on phones, four from the `sm` breakpoint up."

**6. Keys in lists (5 min).** Show `forecast.map(...)` and explain why each item needs a stable `key`.

## Common pitfalls

- **Fetching inside presentational components.** It makes them hard to reuse and test.
- **Using the array index as a `key`** when items can reorder or be removed.
- **Copy-pasting a tile five times** instead of mapping over an array of tile data.
- **Deep prop chains.** If you pass a prop through three components that don't use it, that is the signal for Module 4's techniques.
- **Hard-coding units in text** (`"°C"`) instead of deriving them from `unit`.

## Hands-on exercise

1. Add a **UV Index** tile to `WeatherDetails`. (Hint: the free endpoint doesn't include it, so first decide what to show instead, such as "Feels like".)
2. Extract the tile in `WeatherDetails.jsx` into its own file, `DetailTile.jsx`.
3. **Stretch:** Build a `WindCompass` component that rotates an arrow icon by `wind.deg`.

## Check for understanding

- What makes a component "presentational"?
- Why is `toDisplayTemp` easier to test than a component?
