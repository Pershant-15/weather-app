# Module 2: API Integration and Async Code

**Duration:** about 2 hours
**Files you will touch:** `.env`, `src/api/weatherApi.js`

## Learning objectives

By the end of this module, learners can:

- Get an OpenWeatherMap API key and store it safely in an environment variable.
- Call a REST API with `fetch`, `async`/`await`, and `URLSearchParams`.
- Turn HTTP status codes into friendly error messages.
- Explain why we geocode a city name before asking for its weather.

## Instructor script

**1. Get a key (10 min).** Learners sign up at openweathermap.org, open **API keys**, and copy the default key.
"New keys can take up to two hours to activate. If you see a 401 error right after signing up, that is normal. Wait and retry."

**2. Keep secrets out of code (10 min).**

```bash
cp .env.example .env
# then edit .env:
VITE_OWM_API_KEY=your_real_key
```

"Vite only exposes variables that start with `VITE_`. We read it with `import.meta.env.VITE_OWM_API_KEY`. `.env` is listed in `.gitignore`, so it never reaches GitHub."

Be honest with learners: "Anything in a browser app is visible to users who open dev tools. A key in a frontend is for learning and free-tier projects. Production apps put the key on a server."

**3. Two endpoints, one flow (15 min).** Draw this on the board:

```
"Dehradun"  --Geocoding API-->  lat, lon  --Weather API--> current conditions
                                          --Forecast API-> 5 days, every 3 hours
```

"The weather endpoints want coordinates. The geocoding endpoint converts names to coordinates and also handles duplicates like Paris, Texas."

**4. One request helper (35 min).** Open `weatherApi.js` and build `request()` step by step.

```js
async function request(path, params) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries({ ...params, appid: API_KEY }).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url);
  if (!response.ok) { /* map status to a message */ }
  return response.json();
}
```

Key teaching point: **`fetch` does not throw on a 404 or 401.** It only rejects on network failure. You must check `response.ok` yourself.

**5. Friendly errors (20 min).** Show the status mapping:

| Status | Meaning | Message to the user |
|---|---|---|
| 401 | Bad or inactive key | "The API key was rejected…" |
| 404 | Unknown city | "City not found. Check the spelling…" |
| 429 | Rate limit hit | "Too many requests…" |
| network failure | Offline | "Network error…" |

**6. Why always metric? (10 min).**
"We always ask the API for Celsius and convert to Fahrenheit ourselves. Then the °C/°F toggle never needs another network call, and it responds instantly."

## Common pitfalls

- **Editing `.env` without restarting.** Vite reads it at startup. Stop and rerun `npm run dev`.
- **Missing the `VITE_` prefix.** The variable comes back `undefined`.
- **Committing `.env`.** Check `.gitignore` before the first commit.
- **Assuming `fetch` rejects on 4xx/5xx.** It does not.
- **Passing a city name to the weather endpoint.** Use geocoding first for accurate results.
- **Forgetting `await`.** You get a Promise object instead of data.

## Hands-on exercise

1. In the browser console, call `geocodeCity('Dehradun')` and inspect the object it returns.
2. Temporarily break the key in `.env` and confirm the 401 message appears in the UI.
3. Add a `getAirQuality(lat, lon)` function for the `/data/2.5/air_pollution` endpoint.
4. **Stretch:** Make `geocodeCity` return up to 5 matches so a later module could show a "Did you mean…?" list.

## Check for understanding

- Why does `response.ok` need checking by hand?
- What does the `VITE_` prefix do?
