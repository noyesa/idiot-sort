import { describe, it, expect, vi } from 'vitest';
import { CountingMachine } from '../src/test-runner.mjs';
import { isOption } from 'option';

describe('CountingMachine', () => {
  it('initializes state to all 0s', () => {
    const machine = new CountingMachine([2, 5, 7, 8]);
    expect(machine.counts).toStrictEqual([0, 0, 0, 0]);
  });

  describe('length', () => {
    it('is equal to the total number of unique machine states', () => {
      const machine = new CountingMachine([2, 3, 4, 5]);
      expect(machine.length).toBe(2 * 3 * 4 * 5);
    });
  });

  it('counts a single scalar', () => {
    const machine = new CountingMachine([3]);
    expect(machine.counts).toStrictEqual([0]);
    let next = machine.next();
    expect(isOption(next)).toBe(true);
    expect(next.isSome()).toBe(true);
    expect(next.value()).toStrictEqual([1]);
    expect(machine.isDone).toBe(false);

    next = machine.next();
    expect(next.isSome()).toBe(true);
    expect(next.value()).toStrictEqual([2]);
    expect(machine.isDone).toBe(false);

    next = machine.next();
    expect(isOption(next)).toBe(true);
    expect(next.isNone()).toBe(true);
    expect(machine.isDone).toBe(true);

    // Error is thrown when attempting to continue iterating.
    expect(() => {
      machine.next();
    }).toThrowError();
  });

  it('iterates multiple scalars', () => {
    const machine = new CountingMachine([2, 3]);
    const values = [machine.counts];
    while (!machine.isDone) {
      machine.next().map((counts) => {
        values.push(counts);
      });
    }
    expect(values).toStrictEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });
});
