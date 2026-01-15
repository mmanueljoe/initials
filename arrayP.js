/**
 * Given an array of integers, return the k most frequent elements.
 * the output should be unique
 *
 */

function topKFrequentElements(nums, k) {
  if (nums.length === 1) return nums;

  // step 1: count the frequency of each element
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // step 2: sort the elements by frequency
  const uniqueElements = Array.from(frequencyMap.keys());
  uniqueElements.sort((a, b) => frequencyMap.get(b) - frequencyMap.get(a));

  // step 3: return an array of elements with highest frequency
  return uniqueElements.slice(0, k);
}

const nums = [1, 2, 2, 3, 3, 3];
const k = 2;
console.log(topKFrequentElements(nums, k));



function topKFrequentElements1(nums, k) {
    if (k === 0 || nums.length === 0) return [];
  
    // Count frequencies
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  
    // Buckets where index = frequency, value = list of numbers
    const buckets = Array(nums.length + 1).fill(null).map(() => []);
    for (const [n, count] of freq) buckets[count].push(n);
  
    // Collect from highest frequency down
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
      for (const n of buckets[i]) {
        result.push(n);
        if (result.length === k) break;
      }
    }
    return result;
  }

// You have a sheet of n×m grid paper and would like to draw a cool design on it. You've decided on a block motif similar to Tetris pieces. Specifically, your picture will include the following five types of figures:
// The array figures contains a list of letters representing the types of figures you'd like to include in your design. Your task is to create a matrix of integers representing the grid paper and draw the figures on it according to the following rules:
// Rules for Placement
// Initial State: Start with a matrix of all 0s.
// Indexing: Use the 1-based index of each figure in the figures array to represent it on the grid.
// Example: if figures[0] = 'E', then the cells occupied by this shape will be filled with the value 1.
// Order: Place the figures on the grid in the order they appear in the figures array.
// No Overlap/Rotation: Figures must not overlap any previously placed figures and may not be rotated.
// Placement Logic: Of all available locations, choose the one with the lowest row index. If there are multiple possible locations with the same lowest row index, choose the one with the lowest column index.
// Guarantee: It is guaranteed that all figures will fit on the grid.
// Figure Definitions (Matrices)
// A: [[1]] (1x1 block)
// B: [[1, 1, 1]] (1x3 horizontal bar)
// C: [[1, 1], [1, 1]] (2x2 square)
// D: [[1, 0], [1, 1], [1, 0]] (T-shape pointing right)
// E: [[0, 1, 0], [1, 1, 1]] (T-shape pointing up)
// Example
// Input:
// n = 4
// m = 4
// figures = ['D', 'B', 'A', 'C']
// Expected Output: A 4×4 matrix where:
// The first figure ('D') is placed at the top-leftmost valid spot and filled with 1.
// The second figure ('B') is placed in the next available top-left spot and filled with 2, and so on.

// Jot something down
