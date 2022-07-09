import type {
  NumberRepresentation,
  StringRepresentation,
  TimeStamp,
  Unit,
} from "../../core";

export type ConverterState = {
  unit: Unit;
  value: TimeStamp;
};

export type UiRepresentation = {
  date: StringRepresentation;
  stamp: NumberRepresentation;
};
