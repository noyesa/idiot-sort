/**
 * Determines whether an array of numbers is sorted. An array is isSorted
 * ascending when, for each element in the array, the element at the next
 * highest index is greater or equal.
 * @param {number[]} nums - The ordered set of numbers to test if sorted.
 * @returns {boolean} True if nums is sorted, false otherwise.
 */
export function isSorted(nums) {
  if (!(nums && Array.isArray(nums))) {
    throw new TypeError('nums should be an array.');
  }

  const lastIndex = nums.length - 1;
  // Loop doesn't run for arrays of length 0.
  // Loop runs once for arrays of length 1, and always returns true.
  // All other lengths have each item compared with the next.
  for (let i = 0; i < lastIndex; ++i) {
    const num = nums[i];
    // Consider out of bounds values infinite so num is always less.
    const nextNum = i < lastIndex ? nums[i + 1] : Infinity;
    if (nextNum < num) {
      return false;
    }
  }

  return true;
}
