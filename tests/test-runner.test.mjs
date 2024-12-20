import { describe, it, expect } from 'vitest';
import { isOption, none } from 'option';
import { CountingMachine } from '../src/test-runner.mjs';

describe('CountingMachine', () => {
  it('initializes state to all 0s', () => {
    const machine = new CountingMachine([2, 5, 7, 8]);
    expect(machine.counts).toStrictEqual([0, 0, 0, 0]);
  });

  it('initializes state to provided start value', () => {
    const machine = new CountingMachine([2, 3], 1);
    expect(machine.counts).toStrictEqual([1, 1]);
  });

  describe('length', () => {
    it('is equal to the total number of unique machine states', () => {
      const machine = new CountingMachine([2, 3, 4, 5]);
      expect(machine.length).toBe(2 * 3 * 4 * 5);
    });
  });

  describe('counts', () => {
    it('returns the current state of the machine', () => {
      const machine = new CountingMachine([2, 3, 4]);
      expect(machine.counts).toStrictEqual([0, 0, 0]);
      machine.next();
      expect(machine.counts).toStrictEqual([0, 0, 1]);
    });
  });

  describe('next', () => {
    it('advances the counter to the next state', () => {
      const machine = new CountingMachine([2, 2]);
      expect(machine.counts).toStrictEqual([0, 0]);
      const result = machine.next();
      expect(isOption(result)).toBe(true);
      expect(result.isSome()).toBe(true);
      expect(result.value()).toStrictEqual([0, 1]);
      expect(machine.next().value()).toStrictEqual([1, 0]);
      expect(machine.next().value()).toStrictEqual([1, 1]);
    });

    it('returns none when iteration is complete', () => {
      const machine = new CountingMachine([2, 2]);
      // Advance the machine to its final state.
      machine.next(); // [0, 1]
      machine.next(); // [1, 0]
      machine.next(); // [1, 1];
      const result = machine.next();
      expect(isOption(result)).toBe(true);
      expect(result.isNone()).toBe(true);
      expect(result).toBe(none);
    });
  });

  describe('reset', () => {
    it('sets a finished machine back to initial state', () => {
      const machine = new CountingMachine([2, 2]);

      // Advance until machine is in terminal state.
      while (machine.next().isSome()) {}
      machine.reset();
      expect(machine.counts).toStrictEqual([0, 0]);
      expect(machine.next().isSome()).toBe(true);
    });
  });
});
