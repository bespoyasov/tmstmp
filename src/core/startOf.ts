import type { TimeStamp } from "./domain";

export const startOf = (timeStamp: TimeStamp) => {
  const moment = new Date(timeStamp);
  moment.setHours(0, 0, 0, 0);
  return moment.getTime();
};
