import { createEvent } from "effector";
import type { TimeStamp } from "../../core";
import type { ConverterState } from "./types";

export const updateDateEvent = createEvent<TimeStamp>();

export const updateDate = (
  state: ConverterState,
  value: TimeStamp
): ConverterState => ({ ...state, value });
