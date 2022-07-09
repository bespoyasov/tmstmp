import type { Normalizer } from "./domain";

export const normalize: Normalizer = (unit, value) => {
  return unit === "ms" ? value : value * 1000;
};
