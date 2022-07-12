import type { StorageKey, StorageValue } from "./types";

export function write<T extends StorageValue>(key: StorageKey, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}
