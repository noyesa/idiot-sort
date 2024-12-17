/**
 * Conducts a sort in the dumbest way possible.
 * @param {number[]} nums - The numbers to sort.
 * @returns {Promise<number[]>} A sorted copy of the input array.
 */
export async function idiotSort(nums) {
  const output = [];
  return new Promise((acc, rej) => {
    let expectedTimers = nums.length;
    nums.forEach((num) => {
      setTimeout(() => {
        output.push(num);
        if (--expectedTimers === 0) {
          acc(output);
        }
      }, num);
    });
  });
}
