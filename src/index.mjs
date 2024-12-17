/**
 * Conducts a sort in the dumbest way possible.
 * @param {number[]} nums - The numbers to sort.
 * @returns {Promise<number[]>} A sorted copy of the input array.
 */
export async function idiotSort(nums) {
  const numsCount = nums?.length ?? 0;
  if (numsCount === 0) {
    return [];
  }

  const output = new Array(numsCount);
  // Holds the index of the next number to be added to output.
  let i = 0;

  return new Promise((acc) => {
    nums.forEach((num) => {
      setTimeout(() => {
        output[i++] = num;

        // Once all the input numbers have been written to output, we're done.
        if (i === numsCount) {
          acc(output);
        }
      }, num);
    });
  });
}
