import React from "react";

function getState<T>(key: string): T | null {
  const json = window.localStorage.getItem(key);
  if (!json) return null;
  return JSON.parse(json) as T;
}

function setState<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string, fallbackState: T)
  : [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(() => getState(key) ?? fallbackState);

  React.useEffect(() => {
    setState(key, value);
  }, [value, key]);

  return [value, setValue];
}
