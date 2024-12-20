import { some, none } from 'option';

/**
 * Counts over parameters.
 */
export class CountingMachine {
  /**
   * The start value of each parameter.
   * @type {number}
   */
  #start;

  /**
   * Params. Each value represents the maximum value at which the parameter
   * rolls over to 0.
   * @type {number[]}
   */
  #params;

  /**
   * The current state of the counter. Same length as this.#params, each value
   * is ranged from this.#start to this.#params[i].
   * @type {number[]}
   */
  #counts;

  /**
   * Has iteration of all the ranges specified completed?
   * @type {boolean}
   */
  #isDone = false;

  /**
   * Backing property that stores value for public length getter.
   * @type {option.Some|option.none}
   */
  #length = none;

  /**
   * Has the machine iterated through all possible states?
   * @type {boolean}
   */
  get isDone() {
    return this.#isDone;
  }

  /**
   * The total number of unique states possible.
   * @type {number}
   */
  get length() {
    return this.#length.valueOrElse(() => {
      // Compute the length only once.
      const length = this.#params.reduce(
        (product, param) => product * param,
        1,
      );
      this.#length = some(length);
      return length;
    });
  }

  /**
   * Get the current count values.
   * @type {number[]}
   */
  get counts() {
    return Array.from(this.#counts);
  }

  /**
   * Initialize the machine.
   * @param {number[]} params - The params to range over.
   * @param {number} [start=0] - Starting value of each counter.
   */
  constructor(params, start = 0) {
    this.#start = start;
    this.#params = params;
    this.reset();
  }

  /**
   * Advance the machine to the next state.
   * @returns {some<number[]>|none} The next state, none if finished iterating.
   */
  next() {
    if (this.#isDone) {
      throw new Error('attempted to iterate an already finished machine.');
    }

    let i = this.#params.length - 1;
    while (i >= 0) {
      if (++this.#counts[i] < this.#params[i]) {
        // Terminate if incremented a param that didn't roll over.
        return some(this.counts);
      } else {
        this.#counts[i] = 0;
      }
      --i;
    }

    this.#isDone = true;
    return none;
  }

  /**
   * Resets the counter back to the initial state.
   */
  reset() {
    this.#counts = new Array(this.#params.length).fill(this.#start);
  }
}
