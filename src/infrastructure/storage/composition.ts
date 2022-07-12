import type { Unit } from "../../core";
import { read, write } from "../../services/persistence";

import type { ReadUnit, SaveUnit } from "./ports";
import { UNIT_STORAGE_KEY as key } from "./config";

const defaultUnit: Unit = "ms";

export const readUnit: ReadUnit = () => read<Unit>(key) ?? defaultUnit;
export const saveUnit: SaveUnit = (value: Unit) => write(key, value);
