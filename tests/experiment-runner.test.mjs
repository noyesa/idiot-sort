import { describe, it, vi, expect } from 'vitest';
import { runIterations } from '../src/experiment-runner.mjs';

describe('runIterations', () => {
  it('calls the callback for each state in the n-fold cartesian product', () => {
    const fn = vi.fn();
    runIterations([2, 2], fn);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(0, 0);
    expect(fn).toHaveBeenCalledWith(0, 1);
    expect(fn).toHaveBeenCalledWith(1, 0);
    expect(fn).toHaveBeenCalledWith(1, 1);
  });
});
