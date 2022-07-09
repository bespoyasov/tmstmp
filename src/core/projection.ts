import type { Projector } from "./domain";

export const project: Projector = (unit, value) => {
  return unit === "ms" ? value : Math.round(value / 1000);
};
