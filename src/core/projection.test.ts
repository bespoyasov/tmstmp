import { toUnit } from "./projection";

describe("when given a number of milliseconds", () => {
  it("should return it as is", () => {
    expect(toUnit("ms", 42)).toEqual(42);
  });
});

describe("when given a number of seconds", () => {
  it("should convert it to milliseconds", () => {
    expect(toUnit("s", 100000)).toEqual(100);
  });

  it("should round the result if got a fraction", () => {
    expect(toUnit("s", 100500)).toEqual(101);
    expect(toUnit("s", 100400)).toEqual(100);
  });
});
