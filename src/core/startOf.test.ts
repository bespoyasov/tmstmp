import type { TimeStamp } from "./domain";
import { startOf } from "./startOf";

type TestCase = {
  moment: TimeStamp;
  start: TimeStamp;
};

describe("when given a time stamp of a day", () => {
  const each = it.each<TestCase>([
    { moment: 1654466400000, start: 1654466400000 },
    { moment: 1654466403500, start: 1654466400000 },
    { moment: 82900000, start: 82800000 },
    { moment: 0, start: -3600000 },
    { moment: 1000000000, start: 946800000 },
    { moment: -1000000000, start: -1040400000 },
  ]);

  each(
    "should return the tim stamp for the beginning of that day (%p)",
    ({ moment, start }) => {
      expect(startOf(moment)).toEqual(start);
    }
  );
});
