# Module 6: Units, Forecast Data, and Visual Polish

**Duration:** about 2 hours
**Files you will touch:** `src/utils/formatters.js`, `src/components/ForecastList.jsx`, `src/components/MountainBackground.jsx`

## Learning objectives

By the end of this module, learners can:

- Convert units on the client without extra network calls.
- Reshape API data (3-hour readings into daily summaries).
- Display times in a city's own time zone.
- Draw a flat SVG illustration and use it as a page background.
- Check accessibility basics: labels, alt text, and contrast.

## Instructor script

**1. The °C/°F toggle (15 min).** Recap Module 2: data is fetched once in metric, then converted at display time.

```js
const toDisplayTemp = (celsius, unit) =>
  Math.round(unit === 'metric' ? celsius : (celsius * 9) / 5 + 32);
```

"Wind and visibility convert the same way: km/h to mph, km to miles."

**2. Reshaping forecast data (35 min).** The forecast endpoint returns 40 readings, one every three hours. We need five rows.

Walk through `summarizeForecast` in four steps:

1. Group readings by the city's local date.
2. For each day, take the lowest `temp_min` and highest `temp_max`.
3. Pick the reading closest to noon for the icon and description.
4. Take the highest rain probability (`pop`) of the day.

Run the test script to confirm it returns five days.

**3. City time zones (15 min).** OpenWeatherMap gives a `timezone` offset in seconds.

```js
const shifted = (unix, offset) => new Date((unix + offset) * 1000);
shifted(unix, offset).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit' });
```

"We shift the timestamp by the city's offset, then read it as UTC. That prints the city's wall-clock time no matter where the visitor's laptop is."

**4. The mountain background (30 min).** Open `MountainBackground.jsx`.

"An SVG is a picture made of shapes. Each mountain range is one `<path>` with a single solid fill. No gradients. We create depth with *three layers*, each darker than the one behind it."

Teaching points:
- `viewBox="0 0 1440 900"` defines the drawing's coordinate system.
- `preserveAspectRatio="xMidYMax slice"` keeps the mountains anchored to the bottom and fills the screen.
- `position: fixed` and `pointerEvents: 'none'` keep it behind the UI and ignore clicks.
- Snow caps are polygons **clipped** to the far range with `<clipPath>`, so they follow the slopes exactly.

**5. Accessibility pass (15 min).** Check each of these:

- Every icon-only button has an `aria-label`.
- Weather icons have meaningful `alt` text.
- Text contrast is readable on dark surfaces.
- The decorative background has `aria-hidden="true"`.

**6. Production build (10 min).**

```bash
npm run build
npm run preview
```

## Common pitfalls

- **Converting temperatures twice.** Always convert once, at display time.
- **Using `new Date().getHours()` for city time.** That is the visitor's local time, not the city's.
- **Hard-coded pixel layouts.** Use `xs`/`sm`/`md` breakpoints and test on a phone-sized window.
- **Gradients from defaults.** Check MUI `Paper` and any third-party component.
- **Low-contrast gray text** on dark backgrounds.
- **Background capturing clicks** because `pointer-events` was not disabled.

## Hands-on exercise

1. Add a Kelvin option to the unit toggle.
2. Change the scene to dawn: new solid colors, sun instead of moon, no gradient.
3. Add a fourth mountain layer in the foreground with pine-tree triangles.
4. **Stretch:** Switch the page background by weather (`clear`, `clouds`, `rain`) using different solid sky colors.

## Check for understanding

- Why shift by the timezone offset, then read as UTC?
- How does `<clipPath>` help with the snow caps?
