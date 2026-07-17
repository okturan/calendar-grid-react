import { describe, expect, it } from "vitest";
import { getUsageShare } from "./calendar";
import type { ShareUnit } from "./types";

const shares: ShareUnit = {
  spring: [["31.03", "14.04"]],
  winter: [["21.12", "04.01"]],
};

describe("getUsageShare", () => {
  it("includes both ends of an ordinary cross-month period", () => {
    expect(getUsageShare(31, 2, shares)).toBe("spring");
    expect(getUsageShare(14, 3, shares)).toBe("spring");
  });

  it("excludes days immediately outside an ordinary period", () => {
    expect(getUsageShare(30, 2, shares)).toBeNull();
    expect(getUsageShare(15, 3, shares)).toBeNull();
  });

  it("includes both sides of a period that wraps across New Year", () => {
    expect(getUsageShare(21, 11, shares)).toBe("winter");
    expect(getUsageShare(31, 11, shares)).toBe("winter");
    expect(getUsageShare(1, 0, shares)).toBe("winter");
    expect(getUsageShare(4, 0, shares)).toBe("winter");
  });

  it("excludes days immediately outside a New Year period", () => {
    expect(getUsageShare(20, 11, shares)).toBeNull();
    expect(getUsageShare(5, 0, shares)).toBeNull();
  });
});
