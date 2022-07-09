import type { Projector } from "./domain";

export const toUnit: Projector = (unit, value) => {
  return unit === "ms" ? value : Math.round(value / 1000);
};
