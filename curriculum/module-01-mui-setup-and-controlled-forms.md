# Module 1: MUI Setup and Controlled Forms

**Duration:** about 90 minutes
**Files you will touch:** `src/main.jsx`, `src/theme/darkTheme.js`, `src/components/SearchBar.jsx`

## Learning objectives

By the end of this module, learners can:

- Install Material UI and wrap an app in `ThemeProvider` and `CssBaseline`.
- Build a custom dark theme using solid colors only.
- Explain what a controlled input is and why React state owns its value.
- Validate a form on submit and show an error message with MUI's `TextField`.

## Instructor script

**1. Why a component library (5 min).**
"Writing every button, input, and card from scratch takes weeks. Material UI gives us tested, accessible components, and a theme lets us restyle all of them in one place."

**2. Install (5 min).** Show the dependencies that are already in `package.json`:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

"MUI styles its components with Emotion, which is why we install it alongside."

**3. The theme (20 min).** Open `src/theme/darkTheme.js`.
"`createTheme` takes a plain object. Setting `palette.mode` to `'dark'` flips every component to dark. We then override the exact colors we want."

```js
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4fc3f7' },
    background: { default: '#0b0f14', paper: '#121821' },
  },
});
```

Pause here and ask: "Why do we also override `MuiPaper`?" (Answer below in Common pitfalls.)

**4. Providing the theme (10 min).** Open `src/main.jsx`.
"`ThemeProvider` makes the theme available to every component below it. `CssBaseline` resets browser default styles and applies our dark background to the page."

**5. Controlled inputs (30 min).** Open `SearchBar.jsx`.
"A controlled input has no memory of its own. React state holds the text, and the input just displays it."

```jsx
const [city, setCity] = useState('');

<TextField value={city} onChange={(event) => setCity(event.target.value)} />
```

Walk the data flow on the whiteboard: *keystroke → onChange → setCity → re-render → input shows new value.*

Then show the submit handler:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();      // stop the browser reloading the page
  setTouched(true);
  if (city.trim() === '') return;
  onSearch(city.trim());
  setCity('');
};
```

"`preventDefault` matters. Without it, submitting a form reloads the whole page and you lose all state."

**6. Validation feedback (10 min).** Show the `error` and `helperText` props.
"We only show the error after the user has tried to submit. Showing it on the first render would be rude."

## Common pitfalls

- **Gradients sneaking into a "flat" dark theme.** In dark mode, MUI adds a faint white gradient to elevated `Paper` surfaces. This project removes it with `MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } }`. Learners who skip this wonder why their cards look lighter at the top.
- **Forgetting `event.preventDefault()`.** The page refreshes on every search.
- **Setting `value` without `onChange`.** The input becomes read-only and React logs a warning.
- **Importing from the wrong path.** Use `@mui/material/Button`, not `@mui/material` for everything, to keep bundles smaller.
- **Mutating state.** Always call the setter; never assign to the state variable.

## Hands-on exercise

1. Change the accent color in `darkTheme.js` to orange (`#ffb74d`) and see every button and icon update.
2. Add a minimum length rule: show "City names need at least 2 characters." for one-letter input.
3. **Stretch:** Add a clear (✕) icon inside the input that appears only when the field has text.

## Check for understanding

- What is the difference between a controlled and an uncontrolled input?
- Why does `CssBaseline` need to be inside `ThemeProvider`?
