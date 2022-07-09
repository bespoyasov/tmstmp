import { createEvent } from "effector";

import type { ConverterState } from "./types";
import type { NumberRepresentation } from "../../core";
import { fromUnit } from "../../core";

export const updateStampEvent = createEvent<NumberRepresentation>();

export const updateStamp = (
  state: ConverterState,
  value: NumberRepresentation
): ConverterState => {
  const normalized = fromUnit(state.unit, value);
  return { ...state, value: normalized };
};
