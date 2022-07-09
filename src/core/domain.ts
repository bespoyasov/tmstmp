type MilliSecondsNumber = number;
type SecondsNumber = number;
type DateIsoString = string;

type StringRepresentation = DateIsoString;
type NumberRepresentation = SecondsNumber | MilliSecondsNumber;

export type TimeStamp = MilliSecondsNumber;
export type Unit = "ms" | "s";

export type Normalizer = (unit: Unit, value: NumberRepresentation) => TimeStamp;
export type Projector = (unit: Unit, value: TimeStamp) => NumberRepresentation;
export type Converter = (moment: TimeStamp) => StringRepresentation;
