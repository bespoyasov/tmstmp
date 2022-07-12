import type { Unit } from "../../core";

export type ReadUnit = () => Unit;
export type SaveUnit = (value: Unit) => void;
