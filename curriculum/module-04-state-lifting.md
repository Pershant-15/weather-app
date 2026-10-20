# Module 4: State Lifting and Custom Hooks

**Duration:** about 2 hours
**Files you will touch:** `src/App.jsx`, `src/hooks/useWeather.js`, `src/hooks/useLocalStorage.js`

## Learning objectives

By the end of this module, learners can:

- Decide where a piece of state should live.
- Lift state up to the closest common parent.
- Extract stateful logic into a custom hook.
- Persist state across page reloads with `localStorage`.
- Prevent stale responses from overwriting newer ones.

## Instructor script

**1. The problem (10 min).** Ask: "The unit toggle is in the header. The temperature is in `WeatherCard`. The forecast is somewhere else. Who owns `unit`?"

"When two siblings need the same state, it moves up to their parent. This is called lifting state."

```
App  (owns: unit, history, weather)
├── UnitToggle   (reads unit, calls setUnit)
├── WeatherCard  (reads unit)
└── ForecastList (reads unit)
```

**2. Data down, events up (15 min).**

```jsx
<UnitToggle unit={unit} onChange={setUnit} />
```

"Data flows down as props. User actions flow up as callback functions. A child never changes the parent's state directly."

**3. A custom hook for persistence (25 min).** Open `useLocalStorage.js`.
"A hook is just a function that calls other hooks. This one behaves like `useState` but writes to `localStorage` on every change."

```js
const [unit, setUnit] = useLocalStorage('weather-unit', 'metric');
```

Teaching points:
- The lazy initializer `useState(() => ...)` reads storage only once.
- `JSON.parse` and `setItem` live inside `try/catch` because storage can be blocked.

**4. A custom hook for data fetching (40 min).** Open `useWeather.js`. Show how it bundles status, data, error, and the loader functions behind one API:

```js
const weather = useWeather();
weather.loadByCity('Dehradun');
weather.status;   // 'idle' | 'loading' | 'success' | 'error'
```

"`App` doesn't need to know how loading works. It asks for weather and reads the result."

**5. The race condition (20 min).** This is the most valuable part of the module. Demo it:

1. Search "London".
2. Immediately search "Tokyo".
3. If London's response arrives second, London overwrites Tokyo on screen.

The fix is a request counter in a ref:

```js
const latestRequest = useRef(0);

const requestId = ++latestRequest.current;
// ...await the network...
if (requestId !== latestRequest.current) return; // a newer search started, ignore this one
```

"A ref changes without re-rendering, which is exactly what we want for bookkeeping."

**6. Search history (10 min).** Show `addToHistory`: de-duplicate, put the newest first, cap at six.

```js
setHistory((prev) => [place, ...prev.filter((p) => !samePlace(p, place))].slice(0, 6));
```

"Use the functional form of the setter when the new value depends on the old one."

## Common pitfalls

- **Lifting too high.** Keep state as close as possible to where it is used.
- **Duplicating state.** Don't store `unit` in both `App` and `WeatherCard`.
- **Reading `localStorage` on every render.** Use the lazy initializer.
- **Stale closures.** A callback captured earlier may see old values. Prefer functional updates.
- **Ignoring race conditions.** They look like random bugs in production.
- **Mutating arrays in state** with `push` instead of creating a new array.

## Hands-on exercise

1. Add a **theme density** toggle (comfortable/compact) stored with `useLocalStorage`.
2. Add a "Pin" icon so one favorite city is always shown first in history.
3. Remove the request counter, reproduce the race condition by throttling the network in dev tools, then restore it.
4. **Stretch:** Write a `useDebounce` hook and use it for an autocomplete suggestion list.

## Check for understanding

- Why do we use a ref, not state, for the request counter?
- What does "data down, events up" mean?
