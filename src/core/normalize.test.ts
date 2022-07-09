import { fromUnit } from "./normalize";

describe("when given a number of milliseconds", () => {
  it("should return it as is", () => {
    expect(fromUnit("ms", 42)).toEqual(42);
  });
});

describe("when given a number of seconds", () => {
  it("should convert it to milliseconds", () => {
    expect(fromUnit("s", 42)).toEqual(42000);
  });
});
