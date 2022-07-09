import type { Converter } from "./domain";

type DateComponent = number;
const padded = (x: DateComponent) => String(x).padStart(2, "0");

export const toDateString: Converter = (timeStamp) => {
  const moment = new Date(timeStamp);

  const date = padded(moment.getDate());
  const month = padded(moment.getMonth() + 1);
  const year = moment.getFullYear();

  return `${year}-${month}-${date}`;
};
