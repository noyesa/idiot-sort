import { describe, it, expect } from "vitest";
import { idiotSort } from "../src/index.mjs";

describe("idiotSort", () => {
  it("sorts the input array", () => {
    const nums = [1, 7, 2, 6, 3, 5, 4];
    expect(idiotSort(nums)).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("sorts already sorted input", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    expect(idiotSort(nums)).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("handles empty input", () => {
    expect(idiotSort()).resolves.toStrictEqual([]);
    expect(idiotSort([])).resolves.toStrictEqual([]);
  });
});
