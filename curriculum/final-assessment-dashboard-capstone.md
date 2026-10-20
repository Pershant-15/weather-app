# Final Assessment: Extended Dashboard Capstone

**Duration:** 3 to 4 hours, individual work
**Goal:** Prove you can build, extend, and explain a real data-driven React app.

The finished project in this repository already contains the three capstone features. For the assessment, learners start from a clean copy with those features removed (or build from the Module 6 checkpoint) and implement them, then defend their choices.

## Required features

### 1. Five-day forecast
- Fetch `/data/2.5/forecast` and reduce it to five daily summaries.
- Show weekday, icon, high/low, and rain chance.
- Respect the °C/°F toggle.

### 2. Geolocation
- A "Use my location" button that calls `navigator.geolocation`.
- Show a clear message if permission is denied, times out, or is unsupported.
- Disable the button while locating.

### 3. Search history
- Keep the six most recent places, newest first, with no duplicates.
- Persist them in `localStorage`.
- Click a chip to reload that place; delete a single chip; clear all.

### 4. Non-negotiable quality bar
- Dark theme with solid colors only. **No gradients anywhere.**
- Mountain scene as the page background.
- Loading, error, empty, and success states all handled.
- Responsive from 360px wide up to desktop.
- The API key is in `.env`, and `.env` is not committed.

## Rubric (100 points)

| Area | Points | What full marks look like |
|---|---|---|
| Component structure | 15 | Small components, props only, no fetching in presentational ones |
| State management | 15 | State lives in the right place, no duplicated state |
| API integration | 15 | Geocoding plus weather, status codes handled, key in `.env` |
| Conditional rendering | 10 | One `status` drives idle/loading/error/success |
| Forecast logic | 10 | Correct daily min/max, local-date grouping |
| Geolocation and history | 10 | Edge cases handled, persistence works |
| Design and theme | 10 | Consistent dark theme, no gradients, mountain background |
| Accessibility | 5 | Labels, alt text, contrast, keyboard use |
| Code quality | 5 | Clear names, no dead code, small functions |
| Viva (oral explanation) | 5 | Can explain the race-condition fix and the timezone shift |

## Viva questions (pick three)

1. Why do we fetch in metric and convert on the client?
2. What happens if two searches overlap, and how does the code handle it?
3. Why geocode before requesting weather?
4. How would you move the API key off the client in production?
5. Why does `fetch` need a manual `response.ok` check?
6. Why does MUI's `Paper` need `backgroundImage: 'none'` in this project?

## Stretch goals (bonus, up to 10 points)

- Hourly forecast chart for the next 24 hours.
- "Did you mean…?" suggestions using multiple geocoding results.
- Weather-based sky color changes (still solid colors).
- Unit tests for `formatters.js` using Vitest.
- Deploy to Netlify or Vercel and document how the key is configured.
