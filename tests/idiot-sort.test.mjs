import { idiotSort } from '../src/idiot-sort';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('idiotSort', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sorts the input array', async () => {
    const nums = [1, 7, 2, 6, 3, 5, 4];
    // Advancing by more than the duration of the longest timer should resolve.
    const result = idiotSort(nums);
    vi.runAllTimers();
    await expect(result).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('sorts already sorted input', async () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    const result = idiotSort(nums);
    vi.runAllTimers();
    await expect(result).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('handles empty input', async () => {
    const result1 = idiotSort(undefined);
    expect(vi.getTimerCount()).toBe(0);
    await expect(result1).resolves.toStrictEqual([]);

    const result2 = idiotSort([]);
    expect(vi.getTimerCount()).toBe(0);
    await expect(result2).resolves.toStrictEqual([]);
  });
});
