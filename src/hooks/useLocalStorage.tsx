import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Инициализация состояния с чтением из localStorage
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key "' + key + '":', error);
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
          console.error(
            'Error parsing localStorage newValue for key "' + key + '":',
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  // Функция для обновления значения в состоянии и localStorage
  const setStoredValue = (newValue: T) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));

      // Генерируем событие для текущей вкладки
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(valueToStore),
        })
      );
    } catch (error) {
      console.error('Error setting localStorage key "' + key + '":', error);
    }
  };

  return [value, setStoredValue];
}
