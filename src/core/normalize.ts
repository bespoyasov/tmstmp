import type { Normalizer } from "./domain";

export const fromUnit: Normalizer = (unit, value) => {
  return unit === "ms" ? value : value * 1000;
};
