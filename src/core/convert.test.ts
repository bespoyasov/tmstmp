import type { TimeStamp } from "./domain";
import { toDateString } from "./convert";

type TestCase = {
  stamp: TimeStamp;
  date: string;
};

describe("when given a time stamp", () => {
  const each = it.each<TestCase>([
    { stamp: -1000000000, date: "1969-12-20" },
    { stamp: 1000050000, date: "1970-01-12" },
    { stamp: 946681200000, date: "2000-01-01" },
    { stamp: 946681212345, date: "2000-01-01" },
    { stamp: 1654466400000, date: "2022-06-06" },
  ]);

  each("should convert it to a date string (%p)", ({ stamp, date }) => {
    expect(toDateString(stamp)).toEqual(date);
  });
});
