import { idiotSort } from '../src/index.mjs';
import { describe, it, expect, vi } from 'vitest';

describe('idiotSort', () => {
  it('sorts the input array', async () => {
    vi.useFakeTimers();
    const nums = [1, 7, 2, 6, 3, 5, 4];
    // Advancing by more than the duration of the longest timer should resolve.
    const result = idiotSort(nums);
    vi.advanceTimersByTime(8);
    await expect(result).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('sorts already sorted input', async () => {
    vi.useFakeTimers();
    const nums = [1, 2, 3, 4, 5, 6, 7];
    const result = idiotSort(nums);
    vi.advanceTimersByTime(8);
    await expect(result).resolves.toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('handles empty input', async () => {
    vi.useFakeTimers();

    const result1 = idiotSort(undefined);
    // There shouldn't be any timers spawned here so we can simply advance.
    vi.advanceTimersByTime(1);
    await expect(result1).resolves.toStrictEqual([]);

    const result2 = idiotSort([]);
    vi.advanceTimersByTime(1);
    await expect(result2).resolves.toStrictEqual([]);
  });
});
