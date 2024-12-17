import { describe, it, expect, vi } from "vitest";
import { idiotSort } from "../src/index.mjs";

describe("idiotSort", () => {
  it("sorts the input array", async () => {
    const nums = [1, 7, 2, 6, 3, 5, 4];
    await expect(idiotSort(nums)).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("sorts already sorted input", async () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    await expect(idiotSort(nums)).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("handles empty input", async () => {
    await expect(idiotSort()).resolves.toStrictEqual([]);
    await expect(idiotSort([])).resolves.toStrictEqual([]);
  });
});
