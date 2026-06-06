import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    // Clearing on each change collapses rapid updates into a single trailing one.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
