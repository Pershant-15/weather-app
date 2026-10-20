import { useEffect, useState } from 'react';

// Works like useState, but the value survives page reloads.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be full or blocked (private mode). The app still works without it.
    }
  }, [key, value]);

  return [value, setValue];
}
