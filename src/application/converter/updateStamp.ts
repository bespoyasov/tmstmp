import { createEvent } from "effector";

import type { ConverterState } from "./types";
import type { NumberRepresentation } from "../../core";
import { normalize } from "../../core";

export const updateStampEvent = createEvent<NumberRepresentation>();

export const updateStamp = (
  state: ConverterState,
  value: NumberRepresentation
): ConverterState => {
  const normalized = normalize(state.unit, value);
  return { ...state, value: normalized };
};
