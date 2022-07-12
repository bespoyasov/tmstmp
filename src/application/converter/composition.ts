import { createStore } from "effector";
import { useStore } from "effector-react";

import { toUnit, toDateString, startOf, Unit } from "../../core";
import { readUnit } from "../../infrastructure";

import type { ConverterState, UiRepresentation } from "./types";
import { updateDateEvent, updateDate } from "./updateDate";
import { updateStampEvent, updateStamp } from "./updateStamp";
import { updateUnitEvent, updateUnit, updateUnitFx } from "./updateUnit";

const today = startOf(Date.now());
const unit = readUnit();

const $converter = createStore<ConverterState>({ unit, value: today });
const $representation = $converter.map<UiRepresentation>(({ unit, value }) => ({
  stamp: toUnit(unit, value),
  date: toDateString(value),
}));

$converter
  .on(updateDateEvent, updateDate)
  .on(updateStampEvent, updateStamp)
  .on(updateUnitEvent, updateUnit);

updateUnitFx.use((unit: Unit): void => {
  window.localStorage.setItem("tmstmp-unit", unit);
});

export const useConverter = () => useStore($converter);
export const useUiRepresentation = () => useStore($representation);
