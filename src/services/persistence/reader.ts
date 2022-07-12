import type { StorageKey, StorageValue } from "./types";

export function read<T extends StorageValue>(key: StorageKey): Nullable<T> {
  const value = window.localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : null;
}
