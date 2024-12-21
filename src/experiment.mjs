import random from 'random';
import * as logger from './logger.mjs';
import { idiotSort } from './idiot-sort.mjs';
import { isSorted } from './sort-utils.mjs';
import { runIterations } from './experiment-runner.mjs';

export function runExperiment() {
  let errors = 0;
  let completed = 0;

  runIterations(
    [
      51, // Length of input array to idiotSort, 1-50.
      19, // Max integer value in generated array, 1-18.
      11, // Number of test iterations to run, 1-10.
    ],
    (length, maxInt) => {
      const input = new Array(length + 50).fill().map(() =>
        random.int(
          1,
          maxInt + 2, // Start maxInt at 2 so the first pass isn't arrays of 1s.
        ),
      );
      const expected = input.toSorted((a, b) => a - b);
      idiotSort(input).then((candidate) => {
        ++completed;
        if (!isSorted(candidate)) {
          ++errors;
          logger.error(
            `Failed sort.\n\tExpected: ${expected}\n\tActual: ${candidate}`,
          );
        }
      });
    },
  );
}
