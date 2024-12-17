import { describe, it, expect } from "vitest";
import { idiotSort } from "../src/index.mjs";

describe("idiotSort", () => {
  it("sorts the input array", () => {
    const nums = [1, 7, 2, 6, 3, 5, 4];
    expect(idiotSort(nums)).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
