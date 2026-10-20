# Module 5: Conditional UI Rendering

**Duration:** about 75 minutes
**Files you will touch:** `src/App.jsx`, `src/components/Loader.jsx`, `src/components/ErrorAlert.jsx`

## Learning objectives

By the end of this module, learners can:

- Model async UI with a single `status` value instead of many booleans.
- Render different UI for idle, loading, error, and success states.
- Build loading skeletons that match the final layout.
- Show helpful messages when something is missing, such as an API key.

## Instructor script

**1. Four states, one variable (15 min).** Write this on the board:

```
idle  →  loading  →  success
                  ↘  error
```

"Beginners often write `isLoading`, `hasError`, and `hasData` as three separate booleans. Then bugs creep in where two are true at once. One `status` string makes impossible states impossible."

**2. Conditional rendering with `&&` (15 min).** Open `App.jsx`:

```jsx
{isLoading && <Loader />}
{weather.status === 'error' && <ErrorAlert message={weather.error} />}
{weather.status === 'success' && <WeatherCard current={weather.current} unit={unit} />}
{weather.status === 'idle' && <WelcomeMessage />}
```

"Exactly one of these is true at a time. If it's false, React renders nothing."

**3. Skeleton loaders (15 min).** Open `Loader.jsx`.
"A spinner tells the user *something* is happening. A skeleton shows *what* is coming. The page doesn't jump when data arrives because the placeholders have the same size as the real cards."

**4. Errors people can act on (15 min).** Compare:

- ❌ "Error 401"
- ✅ "The API key was rejected. Check VITE_OWM_API_KEY in your .env file."

"The message should say what happened and what to do next."

**5. Guard rails for setup (10 min).** Show how the app detects a missing key:

```jsx
{!hasApiKey && (
  <ErrorAlert severity="warning" title="API key missing" message="Copy .env.example to .env…" />
)}
```

"Disabling the search button when it cannot work is better than letting the user click and fail."

**6. Disabled while loading (5 min).** `disabled={!hasApiKey || isLoading}` prevents double submissions.

## Common pitfalls

- **`{count && <X />}` when `count` can be `0`.** React renders the number `0`. Use `count > 0 &&`.
- **Showing stale data during a new load.** Decide deliberately: this app hides old results while loading.
- **Silent failures.** A `catch` that does nothing leaves users staring at a blank screen.
- **Layout shift** from loaders with the wrong size.
- **Error messages that blame the user** or expose raw server text.

## Hands-on exercise

1. Add a "Try again" button to `ErrorAlert` that repeats the last search.
2. Show a friendly empty state in the forecast area if the API returns no data.
3. Make the loader show the city name being searched.
4. **Stretch:** Keep showing the previous weather, dimmed, while a refresh loads.

## Check for understanding

- Why is a single `status` string safer than three booleans?
- What bug can `{items.length && <List />}` cause?
