import { describe, it, expect } from 'vitest';
import { isSorted } from '../src/sort-utils.mjs';

describe('isSorted', () => {
  it('returns true when an empty list is passed', () => {
    expect(isSorted([])).toBe(true);
  });

  it('returns true when a singleton list is passed', () => {
    expect(isSorted([5])).toBe(true);
  });

  it('returns true when a sorted list is passed', () => {
    expect(isSorted([1, 4, 7, 8])).toBe(true);
  });

  it('returns false when an unsorted list is passed', () => {
    expect(isSorted([4, 3, 2, 1])).toBe(false);
  });

  it('throws an exception when something other than an array is passed', () => {
    expect(() => {
      isSorted(undefined);
    }).toThrowError(TypeError);
  });
});
