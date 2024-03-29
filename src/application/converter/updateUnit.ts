import { createEffect, createEvent } from "effector";
import type { Unit } from "../../core";
import type { ConverterState } from "./types";

export const updateUnitEvent = createEvent<Unit>();
export const updateUnitFx = createEffect<Unit, void>();

export const updateUnit = (
  state: ConverterState,
  value: Unit
): ConverterState => ({ ...state, unit: value });
