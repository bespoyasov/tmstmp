import type { ChangeEvent, FormEvent } from "react";
import type { Unit } from "../../core";

import { updateDateEvent } from "./updateDate";
import { updateStampEvent } from "./updateStamp";
import { updateUnitEvent, updateUnitFx } from "./updateUnit";

export const updateUnit = (event: ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value as Unit;
  updateUnitEvent(value);
  updateUnitFx(value);
};

export const updateDate = (event: FormEvent<HTMLInputElement>) => {
  const { valueAsNumber } = event.target as HTMLInputElement;
  updateDateEvent(valueAsNumber);
};

export const updateStamp = (event: FormEvent<HTMLInputElement>) => {
  const { valueAsNumber } = event.target as HTMLInputElement;
  updateStampEvent(valueAsNumber);
};
