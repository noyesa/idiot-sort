/**
 * Conducts a sort in the dumbest way possible.
 * @param {number[]} nums - The numbers to sort.
 * @returns {number[]} A sorted copy of the input array.
 */
export async function idiotSort(nums) {
  let expectedTimers = nums.length;
  const output = [];

  return new Promise((acc, rej) => {
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
