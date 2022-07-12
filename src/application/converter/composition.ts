import { createStore } from "effector";
import { useStore } from "effector-react";

import { toUnit, toDateString, startOf, Unit } from "../../core";

import type { ConverterState, UiRepresentation } from "./types";
import { updateDateEvent, updateDate } from "./updateDate";
import { updateStampEvent, updateStamp } from "./updateStamp";
import { updateUnitEvent, updateUnit } from "./updateUnit";

const today = startOf(Date.now());
const $converter = createStore<ConverterState>({
  unit: (window.localStorage.getItem("unit") as Unit) ?? "ms",
  value: today,
});

const $representation = $converter.map<UiRepresentation>(({ unit, value }) => ({
  stamp: toUnit(unit, value),
  date: toDateString(value),
}));

$converter
  .on(updateDateEvent, updateDate)
  .on(updateStampEvent, updateStamp)
  .on(updateUnitEvent, updateUnit);

export const useConverter = () => useStore($converter);
export const useUiRepresentation = () => useStore($representation);
