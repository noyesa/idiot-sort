import ms from 'ms';
import * as logger from './logger.mjs';
import random from 'random';
import { idiotSort } from './idiot-sort.mjs';
import { isSorted } from './sort-utils.mjs';

export function cli() {
  let length = 0;
  let runs = 0;
  let completed = 0;
  let errors = 0;

  while (length < 20) {
    const input = new Array(length).fill().map(() => random.int(1, 20));
    const inputAsString = JSON.stringify(input);
    const expected = input.toSorted((a, b) => a - b);

    logger.info(`Starting iteration ${length++} with ${inputAsString}`);
    let n = 0;
    while (++n <= 100) {
      // Run the iteration.
      ++runs;
      idiotSort(input).then((candidate) => {
        if (!isSorted(candidate)) {
          ++errors;
          logger.error(
            `Failed sort!\n\tExpected: ${expected}\n\tActual: ${JSON.stringify(candidate)}`,
          );
        }

        // This only runs on the final iteration.
        if (++completed >= 2000) {
          logger.info(`completed: ${completed} - errors: ${errors}`);
        }
      });
    }
  }
}
