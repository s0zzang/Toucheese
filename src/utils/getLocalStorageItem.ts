interface LocalStorageItem<T> {
  state: T;
  version: number;
}

export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  const item = window.localStorage.getItem(key);
  try {
    if (!item) return defaultValue;

    const parsedItem: LocalStorageItem<T> = JSON.parse(item);

    return parsedItem.state ?? defaultValue;
  } catch (error) {
    console.error('Error parsing localStorage:', error);
    return defaultValue;
  }
};
