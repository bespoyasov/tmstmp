import type { Unit } from "../../core";

type Option = {
  value: Unit;
  label: Unit;
};

export const options: Option[] = [
  { value: "ms", label: "ms" },
  { value: "s", label: "s" },
];
