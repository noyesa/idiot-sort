import { product } from 'cartesian-product-generator';
import unitspace from '@stdlib/array-base-unitspace';

/**
 * Generates an n-Fold Cartesian Product of contiguous ranges over integers,
 * specified by the maximum value of each range.
 * @param {number[]} rangeMaximums - The maximum value of each range to generate.
 * @param {number} start - The start value of each range.
 * @returns {*function} A generator that iterates over the cartesian product of
 *   of input ranges
 */
function nFoldCartesianProductOfRanges(rangeMaximums, start = 0) {
  // Generate ranges of integers to iterated.
  const ranges = rangeMaximums.map((param) => unitspace(start, param));
  return product(...ranges);
}

/**
 * Runs experiments by generating n-fold cartesian product of values ranging
 * over sets of integers.
 */
export function runIterations(params, cb) {
  for (const args of nFoldCartesianProductOfRanges(params)) {
    cb(...args);
  }
}
