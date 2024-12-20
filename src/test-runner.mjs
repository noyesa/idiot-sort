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
   * Backing property that stores value for public length getter.
   * @type {option.Some|option.none}
   */
  #length = none;

  /**
   * Indicates we have iterated through all possible states and this machine
   * cannot be reused until reset is called.
   * @type {boolean}
   */
  #isDone = false;

  /**
   * Number of iterations that have been completed.
   * @type {number}
   */
  #iterationCount = 1;

  /**
   * The total number of unique states possible.
   * @type {number}
   */
  get length() {
    return this.#length.valueOrElse(() => {
      // Compute the length only once.
      const length = this.#params.reduce(
        (product, param) => product * (param - this.#start),
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
   * The number of iterations that have been returned.
   * @type {number}
   */
  get iterationCount() {
    return this.#iterationCount;
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
      return none;
    }

    ++this.#iterationCount;

    // Iterate RTL to find the least significant counter to increment.
    for (let i = this.#params.length - 1; i >= 0; --i) {
      ++this.#counts[i];
      // Check if we went over the max.
      if (this.#counts[i] < this.#params[i]) {
        return some(this.counts);
      } else {
        this.#counts[i] = 0;
      }
    }

    // If the loop didn't return, it means all counters are at their max value
    // meaning we have reached the terminal state.
    this.#isDone = true;
    return none;
  }

  /**
   * Resets the counter back to the initial state.
   */
  reset() {
    this.#iterationCount = 1;
    this.#isDone = false;
    this.#counts = new Array(this.#params.length).fill(this.#start);
  }

  /**
   * Calls the callback with every possible unique state of all parameters.
   * @param {function} cb - The callback, receives current state as arguments.
   */
  forEach(cb) {
    // Call with the initial state.
    cb(...this.#counts);

    // Iterate until we're done and pass each state to callback.
    while (!this.#isDone) {
      this.next().map((state) => {
        cb(...state);
      });
    }
  }
}
