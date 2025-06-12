import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Не могу прочитать значение по ключу "' + key + '":', error);
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setValue(newValue);
        } catch (error) {
          console.error('Не могу спарсить значение "' + key + '":', error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  const setStoredValue = (newValue: T) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(valueToStore),
        })
      );
    } catch (error) {
      console.error('Ошибка "' + key + '":', error);
    }
  };

  return [value, setStoredValue];
}
