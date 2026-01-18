# Algorithms Guide: Factorial, Recursion, Iteration, and Complexity

## Table of Contents
1. [Factorial Algorithm](#factorial-algorithm)
2. [Recursive vs Iterative Approaches](#recursive-vs-iterative-approaches)
3. [Base Cases](#base-cases)
4. [Invalid Cases and Input Validation](#invalid-cases-and-input-validation)
5. [Call Stack Explained](#call-stack-explained)
6. [Time and Space Complexity](#time-and-space-complexity)
7. [When to Use Recursion vs Iteration](#when-to-use-recursion-vs-iteration)
8. [General Algorithm Design Approach](#general-algorithm-design-approach)
9. [Binary Search Algorithm](#binary-search-algorithm)
10. [Prime Checking and Efficiency](#prime-checking-and-efficiency-isprime)
11. [Binary Search Trees (BST)](#binary-search-trees-bst)
12. [Graphs](#graphs)
13. [Hash Tables](#hash-tables)

---

## Factorial Algorithm

### What is Factorial?

Factorial of a non-negative integer `n` (denoted as `n!`) is the product of all positive integers less than or equal to `n`.

**Mathematical Definition:**
- `0! = 1` (by definition)
- `1! = 1`
- `n! = n × (n-1) × (n-2) × ... × 2 × 1`

**Examples:**
- `5! = 5 × 4 × 3 × 2 × 1 = 120`
- `3! = 3 × 2 × 1 = 6`
- `0! = 1`

---

## Recursive vs Iterative Approaches

### Recursive Approach

**Definition:** A function that calls itself to solve smaller instances of the same problem.

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;  // Base case
  return n * factorial(n - 1);        // Recursive case
}
```

**How it works:**
- Breaks down the problem into smaller subproblems
- Each call waits for the result of a smaller problem
- Eventually reaches a base case that doesn't need recursion
- Then "unwinds" back up, combining results

**Example trace for `factorial(5)`:**
```
factorial(5)
  → needs: 5 * factorial(4)
    → needs: 4 * factorial(3)
      → needs: 3 * factorial(2)
        → needs: 2 * factorial(1)
          → returns: 1 (base case)
        → returns: 2 * 1 = 2
      → returns: 3 * 2 = 6
    → returns: 4 * 6 = 24
  → returns: 5 * 24 = 120
```

### Iterative Approach

**Definition:** Uses loops to repeatedly execute code until a condition is met.

```javascript
function factorial(n) {
  let result = 1;
  
  for (let i = 2; i <= n; i++) {
    result *= i;  // Same as: result = result * i
  }
  
  return result;
}
```

**How it works:**
- Starts with an initial value (`result = 1`)
- Loops through numbers from 2 to n
- Multiplies each number into the result
- Returns the final accumulated value

**Example trace for `factorial(5)`:**
```
Initial: result = 1
i = 2: result = 1 * 2 = 2
i = 3: result = 2 * 3 = 6
i = 4: result = 6 * 4 = 24
i = 5: result = 24 * 5 = 120
Return: 120
```

---

## Base Cases

### What is a Base Case?

A **base case** is a condition that stops the recursion (or loop) and returns a value directly, without further computation.

### Base Cases in Recursive Factorial

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;  // ← Base case
  return n * factorial(n - 1);
}
```

**Why these base cases?**
- `0! = 1` by mathematical definition
- `1! = 1` (no multiplication needed)
- Without a base case, recursion would continue forever (infinite recursion)

### Base Cases in Iterative Factorial

In the iterative version, base cases are **implicitly handled**:

```javascript
function factorial(n) {
  let result = 1;  // ← Handles 0! and 1!
  
  for (let i = 2; i <= n; i++) {  // ← Loop only runs if n >= 2
    result *= i;
  }
  
  return result;
}
```

**How it works:**
- If `n = 0` or `n = 1`, the loop condition `i <= n` is false immediately (since `i` starts at 2)
- The loop never executes
- `result` stays as `1`, which is correct!

**Explicit version (more readable):**
```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;  // Explicit base case
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

---

## Invalid Cases and Input Validation

### What are Invalid Cases?

Invalid cases are inputs that don't make sense for the factorial function:

1. **Negative numbers** - No mathematical definition for `(-5)!`
2. **Non-integers (decimals)** - `3.5!` is not standard factorial
3. **Non-number types** - Strings, objects, `null`, `undefined`
4. **Very large numbers** - Can cause overflow or performance issues

### Complete Factorial with Validation

```javascript
function factorial(n) {
  // Invalid: not a number
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new Error('factorial: n must be a number');
  }
  
  // Invalid: negative
  if (n < 0) {
    throw new Error('factorial: n must be non-negative');
  }
  
  // Invalid: non-integer
  if (!Number.isInteger(n)) {
    throw new Error('factorial: n must be an integer');
  }
  
  // Base cases
  if (n === 0 || n === 1) return 1;
  
  // Iterative computation
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

**Test cases:**
```javascript
factorial(5);      // ✅ 120
factorial(0);      // ✅ 1
factorial(1);      // ✅ 1
factorial(-1);     // ❌ Error: n must be non-negative
factorial(3.5);    // ❌ Error: n must be an integer
factorial("5");    // ❌ Error: n must be a number
```

---

## Call Stack Explained

### What is the Call Stack?

The **call stack** is a data structure used by JavaScript (and most programming languages) to keep track of function calls. It's essentially a **stack** (LIFO - Last In, First Out) that stores **stack frames**.

### Stack Data Structure (DSA Review)

A **stack** is a linear data structure that follows LIFO:
- **Push**: Add element to top
- **Pop**: Remove element from top
- **Peek**: View top element without removing

**Can be implemented with:**
- Arrays (using `push()` and `pop()`)
- Linked lists (with pointer to top)

### What is a Stack Frame?

A **stack frame** (also called an "activation record") contains:
- **Parameters** passed to the function
- **Local variables** declared in the function
- **Return address** (where to continue after function returns)
- **Other bookkeeping info** (instruction pointer, etc.)

### How Call Stack Works

**When a function is called:**
1. A new stack frame is created
2. Frame is **pushed** onto the call stack
3. Function executes

**When a function returns:**
1. Stack frame is **popped** from the call stack
2. Control returns to the caller (using return address)

### Visual Example: Recursive Factorial

**Call stack for `factorial(5)`:**
```
[Top of stack]
┌─────────────────────┐
│ factorial(1)        │ ← Base case reached, returns 1
│   n = 1             │
│   return: 1         │
└─────────────────────┘
┌─────────────────────┐
│ factorial(2)        │ ← Waiting for factorial(1)
│   n = 2             │
│   return: 2 * ?     │
└─────────────────────┘
┌─────────────────────┐
│ factorial(3)        │ ← Waiting for factorial(2)
│   n = 3             │
│   return: 3 * ?     │
└─────────────────────┘
┌─────────────────────┐
│ factorial(4)        │ ← Waiting for factorial(3)
│   n = 4             │
│   return: 4 * ?     │
└─────────────────────┘
┌─────────────────────┐
│ factorial(5)        │ ← Original call
│   n = 5             │
│   return: 5 * ?     │
└─────────────────────┘
[Bottom of stack]
```

**As functions return (unwinding):**
```
factorial(1) returns 1 → frame popped
factorial(2) returns 2 * 1 = 2 → frame popped
factorial(3) returns 3 * 2 = 6 → frame popped
factorial(4) returns 4 * 6 = 24 → frame popped
factorial(5) returns 5 * 24 = 120 → frame popped
```

### Call Stack in Iterative Approach

**Call stack for `factorialLoop(5)`:**
```
[Top of stack]
┌─────────────────────┐
│ factorialLoop(5)    │ ← Only ONE frame!
│   n = 5             │
│   result = 1        │
│   i = 2, 3, 4, 5... │
└─────────────────────┘
[Bottom of stack]
```

**Key difference:** Only **one stack frame** regardless of input size!

### Other Uses of Call Stack

1. **Error reporting** - Stack traces show the call chain
2. **Debugging** - Inspect call stack to see execution flow
3. **Exception handling** - Unwinds stack when exceptions occur

---

## Time and Space Complexity

### What is Complexity Analysis?

**Complexity analysis** helps us understand how an algorithm's performance changes as the input size grows. It answers two key questions:

1. **Time Complexity**: "How long will this take?" (runtime)
2. **Space Complexity**: "How much memory will this use?" (memory)

**Why it matters:**
- Helps choose the best algorithm for your problem
- Predicts performance on large inputs
- Identifies bottlenecks before they become problems

### Understanding Big O Notation

**Big O notation** describes the **worst-case** performance of an algorithm. It tells us how the algorithm scales.

**Key concept:** We care about the **trend**, not exact numbers. We ignore:
- Constants (O(2n) = O(n))
- Lower-order terms (O(n² + n) = O(n²))
- Coefficients (O(5n) = O(n))

**Why?** Because as input grows large, these become insignificant compared to the dominant term.

### Common Time Complexities (From Best to Worst)

#### O(1) - Constant Time

**What it means:** Runtime doesn't depend on input size. Always takes the same time.

**Conceptual understanding:** Like looking up a word in a dictionary when you know the exact page number.

**Examples:**
```javascript
// Accessing array element by index
arr[5];  // O(1) - direct access

// Getting object property
obj.name;  // O(1) - hash table lookup

// Math operations
x + y;  // O(1) - single operation
```

**Visual:**
```
Runtime
  ↑
  |────────────────────────────  Always constant
  |
  └────────────────────────────→ Input Size
```

**Real-world:** Opening a specific book page, turning on a light switch

---

#### O(log n) - Logarithmic Time

**What it means:** Runtime grows slowly - doubles input size only adds one more step.

**Conceptual understanding:** Like searching in a phone book - each step eliminates half the remaining pages.

**Examples:**
```javascript
// Binary search
function binarySearch(arr, target) {
    // Each iteration eliminates half → O(log n)
}

// Finding element in balanced binary search tree
```

**Visual:**
```
Runtime
  ↑
  |     ╱
  |   ╱
  | ╱
  └────────────────────────────→ Input Size
```

**Growth rate:**
- Input: 10 → Steps: ~3
- Input: 100 → Steps: ~7
- Input: 1000 → Steps: ~10
- Input: 1,000,000 → Steps: ~20

**Real-world:** Binary search, finding a word in dictionary by repeatedly splitting in half

---

#### O(n) - Linear Time

**What it means:** Runtime grows proportionally with input size. Double input = double time.

**Conceptual understanding:** Like reading a book page by page - must read every page.

**Examples:**
```javascript
// Linear search
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
}

// Summing array
let sum = 0;
for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}

// Factorial (iterative)
for (let i = 2; i <= n; i++) {
    result *= i;  // n multiplications
}
```

**Visual:**
```
Runtime
  ↑
  |   ╱
  | ╱
  |╱
  └────────────────────────────→ Input Size
```

**Real-world:** Reading a book, counting items in a list, walking through a hallway

---

#### O(n log n) - Linearithmic Time

**What it means:** Between linear and quadratic. Common in efficient sorting algorithms.

**Conceptual understanding:** Like sorting cards by dividing into piles (log n) and merging them (n).

**Examples:**
```javascript
// Merge sort, Quick sort (average case)
// Efficient sorting algorithms
```

**Visual:**
```
Runtime
  ↑
  |     ╱
  |   ╱
  | ╱
  └────────────────────────────→ Input Size
```

**Real-world:** Sorting a deck of cards efficiently, organizing files

---

#### O(n²) - Quadratic Time

**What it means:** Runtime grows with the square of input size. Double input = 4x time.

**Conceptual understanding:** Like comparing every person in a room with every other person.

**Examples:**
```javascript
// Nested loops
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Some operation
    }
}

// Bubble sort, Selection sort
// Comparing all pairs
```

**Visual:**
```
Runtime
  ↑
  |     ╱
  |   ╱
  | ╱
  └────────────────────────────→ Input Size
```

**Real-world:** Comparing all students' test scores, checking all pairs in a tournament

---

#### O(2ⁿ) - Exponential Time

**What it means:** Runtime doubles with each additional input element. Very slow!

**Conceptual understanding:** Like a branching tree where each level doubles the possibilities.

**Examples:**
```javascript
// Recursive Fibonacci (naive)
function fib(n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);  // Two recursive calls
}

// Generating all subsets
// Brute force solutions
```

**Visual:**
```
Runtime
  ↑
  |         ╱
  |       ╱
  |     ╱
  |   ╱
  └────────────────────────────→ Input Size
```

**Real-world:** Trying all password combinations, brute force attacks

---

#### O(n!) - Factorial Time

**What it means:** Extremely slow! Runtime grows factorially with input size.

**Conceptual understanding:** Like generating all possible arrangements of items.

**Examples:**
```javascript
// Generating all permutations
// Traveling Salesman Problem (brute force)
```

**Real-world:** Trying all possible routes, solving puzzles by trying every combination

---

### Complexity Comparison Table

| Complexity | Name | Input: 10 | Input: 100 | Input: 1000 | Real-world Example |
|------------|------|-----------|------------|-------------|-------------------|
| O(1) | Constant | 1 | 1 | 1 | Array access |
| O(log n) | Logarithmic | ~3 | ~7 | ~10 | Binary search |
| O(n) | Linear | 10 | 100 | 1000 | Linear search |
| O(n log n) | Linearithmic | ~33 | ~664 | ~9966 | Merge sort |
| O(n²) | Quadratic | 100 | 10,000 | 1,000,000 | Nested loops |
| O(2ⁿ) | Exponential | 1024 | 1.27×10³⁰ | Too large! | Naive Fibonacci |
| O(n!) | Factorial | 3.6M | Too large! | Too large! | All permutations |

### How to Analyze Time Complexity

#### Step 1: Identify the Input Size

What is `n`? Usually:
- Array length
- Number of elements
- Size of data structure

```javascript
function sumArray(arr) {
    // n = arr.length
}
```

#### Step 2: Count Operations

Look for loops, recursive calls, and nested structures.

**Single loop:**
```javascript
for (let i = 0; i < n; i++) {
    // O(1) operation
}
// Total: n × O(1) = O(n)
```

**Nested loops:**
```javascript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // O(1) operation
    }
}
// Total: n × n × O(1) = O(n²)
```

**Loop with different bounds:**
```javascript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        // O(1) operation
    }
}
// Total: O(n × m)
```

**Recursive calls:**
```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // One recursive call
}
// Total: n calls = O(n)
```

**Binary search (divide and conquer):**
```javascript
function binarySearch(arr, target, left, right) {
    // Eliminates half each time
    // Total: O(log n)
}
```

#### Step 3: Consider Worst Case

Always analyze the **worst-case scenario**:
- Linear search: O(n) - might need to check all elements
- Binary search: O(log n) - might need to go to deepest level

#### Step 4: Simplify

Remove constants and lower-order terms:
- O(2n + 5) → O(n)
- O(n² + n) → O(n²)
- O(5) → O(1)

### Common Patterns and Their Complexities

#### Pattern 1: Single Loop
```javascript
for (let i = 0; i < n; i++) {
    // operations
}
// Time: O(n)
```

#### Pattern 2: Nested Loops (Same Size)
```javascript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // operations
    }
}
// Time: O(n²)
```

#### Pattern 3: Nested Loops (Different Sizes)
```javascript
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        // operations
    }
}
// Time: O(n × m)
```

#### Pattern 4: Loop with Halving
```javascript
while (n > 0) {
    n = n / 2;
    // operations
}
// Time: O(log n)
```

#### Pattern 5: Recursive (Linear)
```javascript
function f(n) {
    if (n <= 1) return;
    f(n - 1);  // One recursive call
}
// Time: O(n)
```

#### Pattern 6: Recursive (Binary)
```javascript
function f(n) {
    if (n <= 1) return;
    f(n / 2);  // Divides problem in half
}
// Time: O(log n)
```

#### Pattern 7: Recursive (Exponential)
```javascript
function f(n) {
    if (n <= 1) return;
    f(n - 1);
    f(n - 1);  // Two recursive calls
}
// Time: O(2ⁿ)
```

### Understanding Space Complexity

**Space complexity** measures **extra memory** used beyond the input itself.

#### O(1) - Constant Space

**What it means:** Uses a fixed amount of memory regardless of input size.

**Examples:**
```javascript
function sumArray(arr) {
    let sum = 0;  // One variable
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
// Space: O(1) - only uses `sum` and `i`
```

**Key insight:** Number of variables doesn't grow with input.

---

#### O(n) - Linear Space

**What it means:** Memory usage grows proportionally with input size.

**Examples:**
```javascript
// Creating a copy of array
function copyArray(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++) {
        copy.push(arr[i]);
    }
    return copy;
}
// Space: O(n) - new array of size n

// Recursive factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// Space: O(n) - n stack frames
```

**Key insight:** Memory grows with input size (arrays, stack frames, etc.)

---

#### O(log n) - Logarithmic Space

**What it means:** Memory grows logarithmically with input size.

**Examples:**
```javascript
// Binary search (recursive)
function binarySearch(arr, target, left, right) {
    // Each recursive call uses O(1) space
    // Depth of recursion: log n
    // Total space: O(log n)
}
```

**Key insight:** Common in divide-and-conquer algorithms with recursion.

---

#### O(n²) - Quadratic Space

**What it means:** Memory grows with the square of input size.

**Examples:**
```javascript
// Creating 2D array
let matrix = [];
for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = 0;
    }
}
// Space: O(n²) - n × n matrix
```

---

### How to Analyze Space Complexity

#### Step 1: Identify Memory Usage

Look for:
- Variables (count them)
- Arrays/objects created
- Stack frames (recursion)
- Function call overhead

#### Step 2: Determine Growth

Does memory usage grow with input?
- **No growth** → O(1)
- **Grows with input** → O(n) or higher
- **Grows with recursion depth** → O(log n) or O(n)

#### Step 3: Count Recursive Calls

```javascript
function factorial(n) {
    // Each call creates one stack frame
    // n calls = n stack frames = O(n) space
}
```

### Visual Guide: Complexity Growth

```
Operations/Time
  ↑
  |                    O(2ⁿ) ────────╮
  |                  ╱               │
  |                ╱                  │
  |              ╱                    │
  |            ╱                      │
  |          ╱ O(n²)                 │
  |        ╱                         │
  |      ╱ O(n log n)               │
  |    ╱                             │
  |  ╱ O(n)                          │
  |╱                                 │
  └───────────────────────────────────┴──→ Input Size
    O(1) O(log n)
```

### Real-World Analogies

| Complexity | Analogy | Example |
|------------|---------|---------|
| **O(1)** | Opening a specific page | "Go to page 42" - instant |
| **O(log n)** | Phone book search | "Find 'Smith'" - split in half repeatedly |
| **O(n)** | Reading a book | Must read every page |
| **O(n log n)** | Sorting cards efficiently | Divide and merge |
| **O(n²)** | Handshake problem | Everyone shakes hands with everyone |
| **O(2ⁿ)** | Password cracking | Try all combinations |
| **O(n!)** | Route planning | Try all possible routes |

### Practical Tips for Analyzing Complexity

#### 1. **Start Simple**
- Identify loops and recursive calls
- Count nested structures
- Don't overthink - look for patterns

#### 2. **Focus on Input Size**
- What grows? That's your `n`
- Ignore fixed-size operations

#### 3. **Look for Patterns**
- Single loop → O(n)
- Nested loops → O(n²) or O(n×m)
- Halving → O(log n)
- Recursion → depends on calls

#### 4. **Consider Worst Case**
- Always analyze worst-case scenario
- Best case is usually less informative

#### 5. **Practice with Examples**
```javascript
// What's the complexity?
function example1(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
// Answer: O(n) - single loop

function example2(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}
// Answer: O(n²) - nested loops

function example3(n) {
    if (n <= 1) return 1;
    return example3(n - 1) + example3(n - 1);
}
// Answer: O(2ⁿ) - two recursive calls
```

### Common Mistakes in Complexity Analysis

#### ❌ Mistake 1: Counting Operations Incorrectly
```javascript
// WRONG: "This has 5 operations, so O(5)"
for (let i = 0; i < n; i++) {
    x++;  // 1 operation
    y++;  // 1 operation
    z++;  // 1 operation
}
// CORRECT: O(n) - loop runs n times, operations inside are constant
```

#### ❌ Mistake 2: Including Constants
```javascript
// WRONG: "O(2n + 5)"
// CORRECT: O(n) - drop constants
```

#### ❌ Mistake 3: Confusing Time and Space
```javascript
function sum(arr) {
    let result = [];  // Space: O(n) if array grows
    // But time might be different
}
```

#### ❌ Mistake 4: Not Considering Input Size
```javascript
// Input size matters!
function process(arr1, arr2) {
    // If arr1.length = n, arr2.length = m
    // Complexity might be O(n × m), not O(n²)
}
```

### Factorial Example: Complexity Analysis

**Iterative Factorial:**
```javascript
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

**Time Complexity:**
- Loop runs `n - 1` times ≈ `n` times
- Each iteration: O(1) operation
- **Total: O(n)**

**Space Complexity:**
- Variables: `result`, `i`, `n` (constant)
- **Total: O(1)**

**Recursive Factorial:**
```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**Time Complexity:**
- `n` recursive calls
- Each call: O(1) operation
- **Total: O(n)**

**Space Complexity:**
- `n` stack frames (one per call)
- Each frame: O(1) space
- **Total: O(n)**

### Binary Search Example: Complexity Analysis

**Iterative Binary Search:**
```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (target < arr[mid]) right = mid - 1;
        else left = mid + 1;
    }
    return -1;
}
```

**Time Complexity:**
- Each iteration eliminates half the elements
- Maximum iterations: log₂(n)
- **Total: O(log n)**

**Space Complexity:**
- Variables: `left`, `right`, `mid` (constant)
- **Total: O(1)**

**Recursive Binary Search:**
```javascript
function binarySearch(arr, target, left, right) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (target < arr[mid]) 
        return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}
```

**Time Complexity:**
- Same as iterative: eliminates half each time
- **Total: O(log n)**

**Space Complexity:**
- Maximum recursion depth: log₂(n)
- Each frame: O(1) space
- **Total: O(log n)**

### Key Takeaways

1. **Time complexity** = how runtime grows with input
2. **Space complexity** = how memory grows with input
3. **Big O** describes worst-case performance
4. **Focus on trends**, not exact numbers
5. **Common patterns**:
   - Single loop → O(n)
   - Nested loops → O(n²)
   - Halving → O(log n)
   - Recursion → depends on calls
6. **Always consider input size** - that's your `n`
7. **Practice identifying patterns** in code
8. **Visualize growth** to understand intuitively

### Practice: Identify the Complexity

Try analyzing these:

```javascript
// 1. What's the time complexity?
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
// Answer: O(n) - single loop

// 2. What's the time complexity?
function printPairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}
// Answer: O(n²) - nested loops, but j starts at i+1
// Actually: n(n-1)/2 ≈ O(n²)

// 3. What's the space complexity?
function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}
// Answer: O(n) - creates new array of size n
```

---

### Comparison Table (Factorial)

| Approach | Time Complexity | Space Complexity | Stack Frames |
|----------|----------------|------------------|--------------|
| Recursive | O(n) | O(n) | n frames |
| Iterative | O(n) | O(1) | 1 frame |

### Why This Matters

**Recursive factorial can fail for large inputs:**
```javascript
factorial(10000);  // ❌ "Maximum call stack size exceeded"
```

**Iterative factorial handles large inputs better:**
```javascript
factorialLoop(10000);  // ✅ Works (though may overflow Number type)
```

---

## When to Use Recursion vs Iteration

### Use Iteration (Loops) When:

1. **Simple counting/aggregation**
   - Summing numbers, finding max/min
   - Walking through arrays linearly

2. **Performance matters**
   - Avoiding stack overflow
   - Better space efficiency

3. **Clear loop pattern**
   - "Do X, N times"
   - "Process each element in array"

**Example:**
```javascript
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

### Use Recursion When:

1. **Problem has natural recursive structure**
   - Tree/graph traversal
   - Nested data structures
   - Divide-and-conquer algorithms

2. **Recursive solution is clearer**
   - Code matches problem structure
   - Easier to understand and maintain

3. **Unknown/arbitrary depth**
   - File system traversal (unknown folder depth)
   - DOM tree traversal (unknown nesting)
   - Parsing nested structures

**Example: Traverse a tree**
```javascript
function traverseTree(node) {
  console.log(node.value);
  
  // Recursively visit each child
  for (let child of node.children) {
    traverseTree(child);  // ← Natural recursion
  }
}
```

### Key Insight

**Iteration and recursion are equivalent** (Turing complete):
- Anything recursive can be written iteratively (using your own stack)
- Anything iterative can be written recursively

**Choose based on:**
- **Clarity** - Which is easier to read?
- **Performance** - Which is more efficient?
- **Problem structure** - Which matches the problem better?

---

## General Algorithm Design Approach

### Step-by-Step Process

#### 1. Understand the Problem
- **What is the input?** (types, constraints, edge cases)
- **What is the expected output?** (format, examples)
- **What are the constraints?** (time limits, memory limits)

**Example for factorial:**
- Input: Non-negative integer `n`
- Output: `n!` (product of 1 to n)
- Edge cases: `0! = 1`, negative numbers?

#### 2. Work Through Examples Manually
- Take small inputs and compute by hand
- Identify patterns
- Understand the logic before coding

**Example:**
```
n = 0 → 1
n = 1 → 1
n = 2 → 2 × 1 = 2
n = 3 → 3 × 2 × 1 = 6
n = 4 → 4 × 3 × 2 × 1 = 24
```

#### 3. Break Down into Steps (Pseudocode)
- Write steps in plain English
- Don't worry about syntax yet
- Focus on logic

**Example:**
```
1. If n is 0 or 1, return 1
2. Otherwise, multiply n by factorial of (n-1)
```

#### 4. Choose an Approach
- **Iteration**: Loop-based solution
- **Recursion**: Self-calling function
- **Built-in methods**: `map`, `filter`, `reduce`, etc.

**Consider:**
- Which approach fits the problem?
- Which is more efficient?
- Which is clearer?

#### 5. Write the Code
- Translate pseudocode to actual code
- Use clear variable names
- Keep it simple first (optimize later)

#### 6. Handle Edge Cases
- Base cases (when to stop)
- Invalid inputs (negative, wrong type, etc.)
- Boundary conditions (empty arrays, zero, etc.)

#### 7. Test Thoroughly
- **Normal cases**: Typical inputs
- **Edge cases**: Boundaries (0, 1, empty, etc.)
- **Invalid cases**: Negative, wrong type, etc.)
- **Large inputs**: Performance testing

**Example test cases:**
```javascript
// Normal cases
factorial(5);    // Expected: 120
factorial(3);    // Expected: 6

// Edge cases
factorial(0);    // Expected: 1
factorial(1);    // Expected: 1

// Invalid cases
factorial(-1);   // Should handle gracefully
factorial(3.5);  // Should handle gracefully
```

#### 8. Analyze Complexity
- **Time complexity**: How fast?
- **Space complexity**: How much memory?
- Can it be optimized?

---

## Prime Checking and Efficiency (`isPrime`)

### Basic Factor-Counting Approach

One simple way to check if a number is prime is to **count its factors**:

```javascript
function isPrime(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) return false;
  if (!Number.isInteger(n)) return false;
  if (n <= 1) return false; // 0, 1, negatives are not prime

  let factors = [];

  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }

  return factors.length === 2; // only 1 and n
}
```

**Idea:**
- A prime number has **exactly 2 factors**: `1` and itself.
- We collect all numbers that divide `n` and check if there are only 2.

**Time complexity:**
- The loop runs from `1` to `n` → **O(n)** checks.

**Space complexity:**
- We store all factors in an array → in the worst case, up to `n` factors (for highly composite numbers) → **O(n)** space.

This is easy to understand but not efficient for large `n`.

---

### Efficient Square-Root Approach

We can make `isPrime` **much more efficient** using two key observations:

1. If `n` is **composite** (not prime), then it can be written as `n = a * b`.
2. At least one of `a` or `b` must be **≤ √n**.

So if `n` has any divisor other than `1` and itself, **one of those divisors must be ≤ √n**.  
That means we **do not need to check all the way up to `n`**, only up to `√n`.

```javascript
function isPrimeEfficient(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) return false;
  if (!Number.isInteger(n)) return false;
  if (n <= 1) return false;       // 0, 1, negatives → not prime
  if (n === 2) return true;       // 2 is the only even prime
  if (n % 2 === 0) return false;  // other even numbers → not prime

  const limit = Math.sqrt(n);     // only check up to √n

  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}
```

### Why This Is More Efficient

Compare the work done:

- **Naive factor-counting:**
  - Checks all integers from `1` to `n`.
  - Time complexity: **O(n)**.
  - Space complexity: **O(n)** (if you store factors).

- **Square-root method:**
  - Skips even numbers after handling `2`.
  - Only checks odd divisors from `3` to `√n`.
  - Time complexity: **O(√n)** (much smaller than `O(n)` for large `n`).
  - Space complexity: **O(1)** (no factor array, just a few variables).

For large `n`, `√n` is dramatically smaller than `n`.  
Example: if `n = 1,000,000`, then `√n ≈ 1000`.  
So instead of doing up to **1,000,000 checks**, we do at most about **1000 checks**.

### Complexity Summary for `isPrime`

| Method                  | Checks up to | Time Complexity | Space Complexity |
|-------------------------|-------------|-----------------|------------------|
| Factor-counting         | `n`         | O(n)            | O(n) (with array)|
| Square-root (efficient) | `√n`        | O(√n)           | O(1)             |

In practice, the **square-root method is preferred** because it:
- Does far fewer modulus operations.
- Uses constant extra memory.
- Scales much better for larger numbers.

You can think of this in the same way as the factorial example:
- Both approaches give the **same correct answer**.
- The more efficient one does **less unnecessary work** and uses **less memory**.

---

## Binary Search Algorithm

### What is Binary Search?

**Binary search** is an efficient algorithm for finding an item in a **sorted array**. It works by repeatedly dividing the search space in half, eliminating half of the remaining elements each time.

**Key Requirements:**
- Array must be **sorted** (ascending or descending)
- Works on any data type that can be compared

**Time Complexity:** O(log n) - much faster than linear search O(n)  
**Space Complexity:** O(1) for iterative, O(log n) for recursive

### How Binary Search Works

The algorithm follows these steps:

1. **Compare** the target with the middle element
2. **If equal** → Found! Return the index
3. **If target > middle** → Search the **right half** (discard left)
4. **If target < middle** → Search the **left half** (discard right)
5. **Repeat** until found or search space is empty

### Visual Example: Searching for 7

```
Array: [1, 3, 5, 7, 9, 11, 13, 15]
        0  1  2  3  4   5   6   7
```

**Step 1:**
```
[1, 3, 5, 7, 9, 11, 13, 15]
         ↑
    middle = 3, arr[3] = 7
    7 === 7? YES! ✅ Found at index 3
```

**If searching for 11 instead:**

**Step 1:**
```
[1, 3, 5, 7, 9, 11, 13, 15]
         ↑
    middle = 3, arr[3] = 7
    11 > 7? Yes → Search RIGHT half
```

**Step 2:**
```
[9, 11, 13, 15]
    ↑
middle = 5, arr[5] = 11
11 === 11? YES! ✅ Found at index 5
```

### Iterative Approach

```javascript
function binarySearch(arr, target) {
    let leftIndex = 0;
    let rightIndex = arr.length - 1;

    while (leftIndex <= rightIndex) {  // ⚠️ Must use <=, not <
        let middleIndex = Math.floor((leftIndex + rightIndex) / 2);

        if (target === arr[middleIndex]) {
            return middleIndex;  // Found!
        }
        
        if (target < arr[middleIndex]) {
            // Target is in LEFT half → move right boundary LEFT
            rightIndex = middleIndex - 1;
        } else {
            // Target is in RIGHT half → move left boundary RIGHT
            leftIndex = middleIndex + 1;
        }
    }

    return -1;  // Not found
}
```

**Visual Trace (searching for 10):**
```
Array: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        0   1   2   3   4  5  6  7  8  9  10 11 12 13 14

Iteration 1:
leftIndex = 0, rightIndex = 14
middleIndex = 7, arr[7] = 3
10 > 3 → leftIndex = 8

Iteration 2:
leftIndex = 8, rightIndex = 14
middleIndex = 11, arr[11] = 7
10 > 7 → leftIndex = 12

Iteration 3:
leftIndex = 12, rightIndex = 14
middleIndex = 13, arr[13] = 9
10 > 9 → leftIndex = 14

Iteration 4:
leftIndex = 14, rightIndex = 14
middleIndex = 14, arr[14] = 10
10 === 10 → Found! Return 14 ✅
```

### Recursive Approach

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    // Base case: search space is empty
    if (left > right) return -1;

    const middleIndex = Math.floor((left + right) / 2);

    if (target === arr[middleIndex]) {
        return middleIndex;  // Found!
    }
    
    if (target < arr[middleIndex]) {
        // Search LEFT half
        return binarySearchRecursive(arr, target, left, middleIndex - 1);
    } else {
        // Search RIGHT half
        return binarySearchRecursive(arr, target, middleIndex + 1, right);
    }
}
```

**Alternative: Using Array Slicing (Less Efficient)**

```javascript
function binarySearchWithSlicing(arr, target) {
    if (arr.length === 0) return -1;

    const middleIndex = Math.floor(arr.length / 2);
    const left = arr.slice(0, middleIndex);
    const right = arr.slice(middleIndex + 1);  // Exclude middle

    if (target === arr[middleIndex]) {
        return middleIndex;
    }
    
    if (target < arr[middleIndex]) {
        // Search left - index stays the same
        return binarySearchWithSlicing(left, target);
    } else {
        // Search right - adjust index by adding (middleIndex + 1)
        const result = binarySearchWithSlicing(right, target);
        if (result === -1) return -1;
        return (middleIndex + 1) + result;  // ⚠️ Must adjust index!
    }
}
```

**Why adjust the index?** Subarrays always start at index 0, so when searching the right half, you need to add the offset to get the original array index.

### Common Mistakes and Bugs

#### ❌ Mistake 1: Using `<` instead of `<=` in loop condition

```javascript
// WRONG
while (leftIndex < rightIndex) {  // ❌ Misses the last element!
    // ...
}

// CORRECT
while (leftIndex <= rightIndex) {  // ✅ Checks all elements
    // ...
}
```

**Why this matters:**
- When `leftIndex === rightIndex`, there's still **one element** to check
- Using `<` exits the loop too early
- Example: Searching for `10` in `[0,1,2,3,4,5,6,7,8,9,10]` would return `-1` instead of `10`

#### ❌ Mistake 2: Wrong search direction logic

```javascript
// WRONG
if (arr[middleIndex] < target) {
    leftIndex = rightIndex - 1;  // ❌ Completely wrong!
}

// CORRECT
if (target < arr[middleIndex]) {
    rightIndex = middleIndex - 1;  // ✅ Move right boundary left
} else {
    leftIndex = middleIndex + 1;  // ✅ Move left boundary right
}
```

**Remember:**
- If `target < middle` → target is in **LEFT half** → move `rightIndex` left
- If `target > middle` → target is in **RIGHT half** → move `leftIndex` right

#### ❌ Mistake 3: Using linear search instead of recursion

```javascript
// WRONG - defeats the purpose of binary search!
if (arr[middleIndex] < target) {
    for (let i = 0; i < left.length; i++) {  // ❌ Linear search!
        if (left[i] === target) return i;
    }
}

// CORRECT - recursively search the half
if (target < arr[middleIndex]) {
    return binarySearchRecursive(arr, target, left, middleIndex - 1);
}
```

#### ❌ Mistake 4: Forgetting to adjust index in recursive slicing approach

```javascript
// WRONG
if (target > arr[middleIndex]) {
    return binarySearchWithSlicing(right, target);  // ❌ Returns wrong index!
}

// CORRECT
if (target > arr[middleIndex]) {
    const result = binarySearchWithSlicing(right, target);
    if (result === -1) return -1;
    return (middleIndex + 1) + result;  // ✅ Adjust for original array
}
```

#### ❌ Mistake 5: Returning value instead of index

```javascript
// WRONG
if (target === arr[middleIndex]) {
    return arr[middleIndex];  // ❌ Returns value (10) instead of index (14)
}

// CORRECT
if (target === arr[middleIndex]) {
    return middleIndex;  // ✅ Returns index
}
```

#### ❌ Mistake 6: Not using `Math.floor()` for middle index

```javascript
// WRONG
const middleIndex = arr.length / 2;  // ❌ Could be decimal (e.g., 7.5)

// CORRECT
const middleIndex = Math.floor((leftIndex + rightIndex) / 2);  // ✅ Always integer
```

### Visual Diagram: How Binary Search Narrows Down

```
Searching for 7 in [1, 3, 5, 7, 9, 11, 13, 15]

Initial: [1, 3, 5, 7, 9, 11, 13, 15]
         ↑                    ↑
      left=0              right=7
         Check middle (index 3) = 7 ✅ Found!


Searching for 11 in [1, 3, 5, 7, 9, 11, 13, 15]

Step 1: [1, 3, 5, 7, 9, 11, 13, 15]
         ↑                    ↑
      left=0              right=7
         Check middle (3) = 7
         11 > 7 → Search RIGHT
         
Step 2:              [9, 11, 13, 15]
                      ↑        ↑
                   left=4   right=7
                      Check middle (5) = 11 ✅ Found!


Searching for 6 in [1, 3, 5, 7, 9, 11, 13, 15]

Step 1: [1, 3, 5, 7, 9, 11, 13, 15]
         ↑                    ↑
      left=0              right=7
         Check middle (3) = 7
         6 < 7 → Search LEFT
         
Step 2: [1, 3, 5]
         ↑     ↑
      left=0 right=2
         Check middle (1) = 3
         6 > 3 → Search RIGHT
         
Step 3:          [5]
                  ↑
              left=2 right=2
                  Check middle (2) = 5
                  6 > 5 → Search RIGHT
                  
Step 4: left=3, right=2 → left > right → Not found! ❌
```

### Understanding Index Adjustments in Recursive Slicing

When you use `arr.slice()`, the subarray **always starts at index 0**, regardless of where it came from:

```javascript
const arr = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//           0   1   2   3   4  5  6  7  8  9  10 11 12 13 14

const middleIndex = 7;
const left = arr.slice(0, 7);   // [-4, -3, -2, -1, 0, 1, 2]
const right = arr.slice(8);      // [3, 4, 5, 6, 7, 8, 9, 10]
                                 //  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
                                 //  0  1  2  3  4  5  6  7  ← New indices!
```

**Key insight:**
- **Left subarray**: Indices match original (0 to middleIndex-1) → **No adjustment needed**
- **Right subarray**: Indices start at 0, but in original they start at (middleIndex + 1) → **Must add (middleIndex + 1)**

### How to Learn Binary Search as a Beginner

#### 1. **Start with the Concept**
- Understand that binary search **eliminates half** the search space each time
- Visualize it like searching in a phone book: open to middle, decide which half, repeat

#### 2. **Trace Through Examples Manually**
- Take a small sorted array (5-10 elements)
- Pick a target and trace through step-by-step
- Draw the array and mark `leftIndex`, `rightIndex`, and `middleIndex` at each step

#### 3. **Understand the Loop Condition**
- `leftIndex <= rightIndex` means "while there's still a search space"
- When `leftIndex > rightIndex`, the search space is empty → not found

#### 4. **Master the Index Updates**
- **Target < middle**: Move `rightIndex = middleIndex - 1` (eliminate right half)
- **Target > middle**: Move `leftIndex = middleIndex + 1` (eliminate left half)
- Think: "Which half should I keep? Move the boundary of the half I'm discarding"

#### 5. **Practice with Edge Cases**
- Target at first element (index 0)
- Target at last element (index n-1)
- Target not in array
- Empty array
- Array with one element

#### 6. **Common Beginner Confusion Points**

**Q: Why do we add/subtract 1 from middleIndex?**  
A: Because we've already checked `arr[middleIndex]`, so we exclude it from the next search space.

**Q: Why `<=` instead of `<`?**  
A: When `leftIndex === rightIndex`, there's still one element to check. Using `<` would skip it.

**Q: In recursive slicing, why adjust the index for right but not left?**  
A: Left subarray indices match the original (0 to middle-1). Right subarray indices start at 0 but represent elements from (middle+1) onward in the original.

#### 7. **Debugging Tips**
- Add `console.log()` to see `leftIndex`, `rightIndex`, `middleIndex` at each iteration
- Check if your loop condition allows checking the last element
- Verify you're updating the correct boundary (left vs right)
- Make sure you're returning the index, not the value

### Complexity Analysis

| Approach | Time Complexity | Space Complexity | Notes |
|----------|----------------|------------------|-------|
| Iterative | O(log n) | O(1) | Preferred - no recursion overhead |
| Recursive (with indices) | O(log n) | O(log n) | Stack frames for each recursive call |
| Recursive (with slicing) | O(log n) | O(n log n) | Inefficient - creates new arrays each call |

**Why O(log n)?**
- Each step eliminates **half** the remaining elements
- For array of size `n`, we need at most `log₂(n)` steps
- Example: Array of 1000 elements → at most 10 comparisons (log₂(1000) ≈ 10)

### Comparison: Linear Search vs Binary Search

| Feature | Linear Search | Binary Search |
|---------|--------------|---------------|
| **Time** | O(n) | O(log n) |
| **Requires sorted?** | No | Yes |
| **Best case** | O(1) - first element | O(1) - middle element |
| **Worst case** | O(n) - last element | O(log n) - any element |
| **Use when** | Unsorted array, small array | Large sorted array |

### Practice Exercises

1. **Implement binary search iteratively** - search for a number in a sorted array
2. **Implement binary search recursively** - using index parameters (not slicing)
3. **Find first occurrence** - modify to find the first index if duplicates exist
4. **Find insertion point** - where a number should be inserted to maintain order
5. **Search in rotated array** - advanced: array is sorted but rotated

### Key Takeaways

1. **Binary search requires a sorted array**
2. **Eliminates half the search space each step** → O(log n) time
3. **Use `<=` not `<`** in loop condition to check all elements
4. **Update boundaries correctly**: `target < middle` → move right boundary, `target > middle` → move left boundary
5. **Iterative approach is preferred** - O(1) space vs O(log n) for recursive
6. **In recursive slicing, adjust indices** for right subarray by adding `(middleIndex + 1)`
7. **Always return the index**, not the value

---

## Binary Search Trees (BST)

### What is a Binary Search Tree?

A **Binary Search Tree (BST)** is a binary tree data structure where:
- Each node has at most **two children** (left and right)
- **Left subtree** contains values **less than** the node's value
- **Right subtree** contains values **greater than** the node's value
- Both left and right subtrees are also BSTs

**Key Property:** In-order traversal of a BST gives values in **sorted order**.

### Visual Example

```
        10
       /  \
      5    15
     / \     \
    3   7    20
```

**Properties:**
- All values in left subtree of 10: `[3, 5, 7]` < 10
- All values in right subtree of 10: `[15, 20]` > 10
- In-order traversal: `3, 5, 7, 10, 15, 20` (sorted!)

### BST Node Structure

```javascript
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
```

### Insertion

**Algorithm:**
1. If tree is empty, create root node
2. Compare value with current node
3. If smaller → go left, if larger → go right
4. Repeat until finding null position
5. Insert new node there

```javascript
insert(value) {
    const newNode = new Node(value);
    
    if (this.isEmpty()) {
        this.root = newNode;
    } else {
        this.insertNode(this.root, newNode);
    }
}

insertNode(root, newNode) {
    if (newNode.value < root.value) {
        if (root.left === null) {
            root.left = newNode;
        } else {
            this.insertNode(root.left, newNode);
        }
    } else {
        if (root.right === null) {
            root.right = newNode;
        } else {
            this.insertNode(root.right, newNode);
        }
    }
}
```

**Time Complexity:** O(log n) average, O(n) worst case (unbalanced tree)  
**Space Complexity:** O(log n) recursive, O(1) iterative

### Search

**Algorithm:**
1. Start at root
2. Compare value with current node
3. If equal → found!
4. If smaller → search left subtree
5. If larger → search right subtree
6. If null reached → not found

```javascript
search(root, value) {
    if (root === null) {
        return false;
    }
    
    if (root.value === value) {
        return true;
    } else if (value < root.value) {
        return this.search(root.left, value);
    } else {
        return this.search(root.right, value);
    }
}
```

**Time Complexity:** O(log n) average, O(n) worst case  
**Space Complexity:** O(log n) recursive

### Tree Traversals

#### 1. PreOrder Traversal

**Order:** Root → Left → Right

```javascript
preOrder(root) {
    if (root) {
        console.log(root.value);      // Visit root FIRST
        this.preOrder(root.left);     // Then left subtree
        this.preOrder(root.right);    // Then right subtree
    }
}
```

**Example:** `10 → 5 → 3 → 7 → 15 → 20`

**Use cases:** Copying tree structure, prefix expressions

#### 2. InOrder Traversal

**Order:** Left → Root → Right

```javascript
inOrder(root) {
    if (root) {
        this.inOrder(root.left);      // Visit left FIRST
        console.log(root.value);       // Visit root IN MIDDLE
        this.inOrder(root.right);      // Then right subtree
    }
}
```

**Example:** `3 → 5 → 7 → 10 → 15 → 20` (sorted order!)

**Use cases:** Printing BST in sorted order, infix expressions

#### 3. PostOrder Traversal

**Order:** Left → Right → Root

```javascript
postOrder(root) {
    if (root) {
        this.postOrder(root.left);    // Visit left FIRST
        this.postOrder(root.right);   // Then right subtree
        console.log(root.value);      // Visit root LAST
    }
}
```

**Example:** `3 → 7 → 5 → 20 → 15 → 10`

**Use cases:** Deleting tree, postfix expressions, calculating directory sizes

#### 4. LevelOrder Traversal (BFS)

**Order:** Level by level, left to right

```javascript
levelOrder(root) {
    const queue = [];
    queue.push(root);
    
    while (queue.length) {
        let curr = queue.shift();
        console.log(curr.value);
        
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
    }
}
```

**Example:** `10 → 5 → 15 → 3 → 7 → 20`

**Use cases:** Printing tree level by level, finding shortest path

### Finding Min and Max

**Min:** Leftmost node (keep going left)  
**Max:** Rightmost node (keep going right)

```javascript
min(root) {
    if (root.left === null) {
        return root.value;
    } else {
        return this.min(root.left);
    }
}

max(root) {
    if (root.right === null) {
        return root.value;
    } else {
        return this.max(root.right);
    }
}
```

**Time Complexity:** O(log n) average, O(n) worst case  
**Space Complexity:** O(log n) recursive

### Deletion

**Three cases:**
1. **No children:** Simply delete the node
2. **One child:** Replace node with its child
3. **Two children:** Replace with inorder successor (min of right subtree)

```javascript
delete(value) {
    this.root = this.deleteNode(this.root, value);
}

deleteNode(root, value) {
    if (root === null) {
        return root;
    }
    
    if (value < root.value) {
        root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
        root.right = this.deleteNode(root.right, value);
    } else {
        // Node to delete found
        
        // Case 1: No children
        if (!root.left && !root.right) {
            return null;
        }
        
        // Case 2: One child
        if (!root.left) {
            return root.right;
        } else if (!root.right) {
            return root.left;
        }
        
        // Case 3: Two children
        root.value = this.min(root.right);
        root.right = this.deleteNode(root.right, root.value);
    }
    
    return root;
}
```

**Time Complexity:** O(log n) average, O(n) worst case  
**Space Complexity:** O(log n) recursive

### BST Complexity Summary

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Min/Max | O(log n) | O(n) |
| Traversal | O(n) | O(n) |

**Note:** Worst case O(n) occurs when tree becomes a linked list (unbalanced).

### Key Takeaways

1. **BST maintains sorted order** - left < root < right
2. **InOrder traversal** gives sorted values
3. **Average operations** are O(log n) - very efficient!
4. **Worst case** is O(n) if tree is unbalanced
5. **Self-balancing trees** (AVL, Red-Black) maintain O(log n) worst case

---

## Graphs

### What is a Graph?

A **graph** is a collection of **vertices** (nodes) connected by **edges** (links). Unlike trees, graphs can have cycles and multiple paths between nodes.

**Types:**
- **Directed:** Edges have direction (A → B)
- **Undirected:** Edges are bidirectional (A ↔ B)
- **Weighted:** Edges have weights/costs
- **Unweighted:** All edges equal

### Graph Representations

#### 1. Adjacency Matrix

A 2D array where `matrix[i][j] = 1` if edge exists, `0` otherwise.

```javascript
// Undirected graph: A-B-C
const matrix = [
  [0, 1, 0],  // A: connected to B
  [1, 0, 1],  // B: connected to A and C
  [0, 1, 0],  // C: connected to B
];
```

**Pros:**
- O(1) edge lookup
- Simple to implement

**Cons:**
- O(V²) space (V = vertices)
- Inefficient for sparse graphs

#### 2. Adjacency List

An object/array where each vertex maps to a list of its neighbors.

```javascript
// Same graph as above
const adjacencyList = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B']
};
```

**Pros:**
- O(V + E) space (E = edges)
- Efficient for sparse graphs
- Easy to iterate neighbors

**Cons:**
- O(degree) edge lookup (not O(1))

### Graph Implementation (Adjacency List)

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    // Add a vertex
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = new Set();
        }
    }
    
    // Add an edge (undirected)
    addEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1]) {
            this.addVertex(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.addVertex(vertex2);
        }
        
        this.adjacencyList[vertex1].add(vertex2);
        this.adjacencyList[vertex2].add(vertex1);  // Undirected
    }
    
    // Check if edge exists
    hasEdge(vertex1, vertex2) {
        return (
            this.adjacencyList[vertex1]?.has(vertex2) &&
            this.adjacencyList[vertex2]?.has(vertex1)
        );
    }
    
    // Remove an edge
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1]?.delete(vertex2);
        this.adjacencyList[vertex2]?.delete(vertex1);
    }
    
    // Remove a vertex
    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            return;
        }
        
        // Remove all edges connected to this vertex
        for (let adjacentVertex of this.adjacencyList[vertex]) {
            this.removeEdge(vertex, adjacentVertex);
        }
        
        delete this.adjacencyList[vertex];
    }
    
    // Display graph
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex + " -> " + [...this.adjacencyList[vertex]]);
        }
    }
}
```

### Graph Traversal

#### Depth-First Search (DFS)

**Algorithm:** Explore as far as possible along each branch before backtracking.

```javascript
dfs(start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (let neighbor of this.adjacencyList[start]) {
        if (!visited.has(neighbor)) {
            this.dfs(neighbor, visited);
        }
    }
}
```

**Time Complexity:** O(V + E)  
**Space Complexity:** O(V) for visited set + recursion stack

#### Breadth-First Search (BFS)

**Algorithm:** Explore all neighbors at current depth before moving to next level.

```javascript
bfs(start) {
    const queue = [start];
    const visited = new Set([start]);
    
    while (queue.length) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (let neighbor of this.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

**Time Complexity:** O(V + E)  
**Space Complexity:** O(V) for queue and visited set

### Graph Use Cases

- **Social networks:** Friends connections
- **Web pages:** Links between pages
- **Maps:** Roads connecting cities
- **Dependencies:** Package dependencies
- **Recommendation systems:** User-item connections

### Key Takeaways

1. **Graphs** represent relationships between entities
2. **Adjacency list** is preferred for most use cases (space efficient)
3. **DFS** uses recursion/stack (goes deep)
4. **BFS** uses queue (goes wide)
5. **Both** have O(V + E) time complexity

---

## Hash Tables

### What is a Hash Table?

A **hash table** (hash map) is a data structure that stores key-value pairs. It uses a **hash function** to compute an index into an array of buckets, where the value can be found.

**Key Operations:**
- **Set:** Insert/update a key-value pair
- **Get:** Retrieve value by key
- **Remove:** Delete a key-value pair

**Average Time Complexity:** O(1) for all operations!  
**Worst Case:** O(n) if many collisions

### How Hash Tables Work

1. **Hash function** converts key → index
2. **Store value** at that index
3. **Collision handling** if multiple keys hash to same index

### Hash Function

A function that maps keys to array indices.

```javascript
hash(key) {
    let total = 0;
    
    for (let i = 0; i < key.length; i++) {
        total += key.charCodeAt(i);
    }
    
    return total % this.size;  // Modulo to fit array size
}
```

**Properties of good hash function:**
- **Deterministic:** Same key → same index
- **Uniform distribution:** Spreads keys evenly
- **Fast:** O(1) or O(k) where k is key length

### Collision Handling

When two keys hash to the same index, we need to handle the collision.

#### Chaining (Separate Chaining)

Store multiple key-value pairs at the same index using a data structure (array, linked list).

```javascript
class HashTable {
    constructor(size) {
        this.table = new Array(size);
        this.size = size;
    }
    
    hash(key) {
        let total = 0;
        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }
        return total % this.size;
    }
    
    set(key, value) {
        const index = this.hash(key);
        let bucket = this.table[index];
        
        if (!bucket) {
            bucket = [[key, value]];  // Create bucket
        } else {
            // Check if key already exists
            const sameKeyItem = bucket.find(item => item[0] === key);
            if (sameKeyItem) {
                sameKeyItem[1] = value;  // Update existing
            } else {
                bucket.push([key, value]);  // Add new pair
            }
        }
        
        this.table[index] = bucket;
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        
        if (bucket) {
            const sameKeyItem = bucket.find(item => item[0] === key);
            if (sameKeyItem) {
                return sameKeyItem[1];
            }
        }
        
        return undefined;
    }
    
    remove(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        
        if (bucket) {
            const sameKeyItem = bucket.find(item => item[0] === key);
            if (sameKeyItem) {
                bucket.splice(bucket.indexOf(sameKeyItem), 1);
            }
        }
    }
    
    display() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, this.table[i]);
            }
        }
    }
}
```

### Hash Table Example

```javascript
const hashTable = new HashTable(5);

hashTable.set("name", "John");
hashTable.set("age", 25);
hashTable.set("city", "New York");

console.log(hashTable.get("name"));  // "John"
hashTable.remove("age");
hashTable.display();
```

**Visual representation:**
```
Index 0: [["name", "John"]]
Index 1: [["age", 25]]
Index 2: [["city", "New York"]]
Index 3: null
Index 4: null
```

### Hash Table Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Set | O(1) | O(n) |
| Get | O(1) | O(n) |
| Remove | O(1) | O(n) |

**Worst case** occurs when:
- All keys hash to same index (poor hash function)
- Many collisions requiring linear search through bucket

### Load Factor

**Load factor** = number of entries / number of buckets

- **High load factor** (> 0.7): More collisions, slower performance
- **Low load factor** (< 0.3): Wasted space
- **Optimal:** Around 0.5-0.7

**Solution:** Resize table when load factor gets too high.

### Hash Table Use Cases

- **Caching:** Fast lookups (e.g., memoization)
- **Database indexing:** Quick record access
- **Dictionaries/Maps:** Key-value storage
- **Counting frequencies:** Track occurrences
- **Deduplication:** Remove duplicates

### Key Takeaways

1. **Hash tables** provide O(1) average time for operations
2. **Hash function** maps keys to indices
3. **Collisions** handled by chaining or open addressing
4. **Load factor** affects performance
5. **Worst case** is O(n) but rare with good hash function

---

## Summary

### Key Takeaways

1. **Factorial** can be implemented recursively or iteratively
2. **Base cases** stop recursion/loops (e.g., `0! = 1`, `1! = 1`)
3. **Call stack** stores function calls (like a stack data structure)
4. **Recursion** uses O(n) space (one frame per call)
5. **Iteration** uses O(1) space (constant variables)
6. **Both** have O(n) time complexity for factorial
7. **Choose iteration** for simple loops and performance
8. **Choose recursion** for tree-like structures and clarity
9. **Binary search** requires sorted array and eliminates half the space each step → O(log n)
10. **Binary search loop condition** must use `<=` not `<` to check all elements
11. **Index adjustments** needed in recursive slicing approach for right subarray
12. **Binary Search Trees** maintain sorted order with O(log n) average operations
13. **Tree traversals**: PreOrder (root first), InOrder (sorted), PostOrder (root last)
14. **Graphs** represent relationships using adjacency lists or matrices
15. **DFS** explores deep (recursion/stack), **BFS** explores wide (queue)
16. **Hash Tables** provide O(1) average time using hash functions and collision handling

### Practice Exercises

**Basic Algorithms:**
1. **Sum of array** (iterative and recursive)
2. **Find maximum in array** (iterative and recursive)
3. **Binary search** (iterative and recursive)
4. **Fibonacci** (iterative and recursive)

**Data Structures:**
5. **Linked List** - Implement append, prepend, insert, remove, search, reverse
6. **Binary Search Tree** - Implement insert, search, delete, traversals
7. **Graph** - Implement addVertex, addEdge, DFS, BFS
8. **Hash Table** - Implement set, get, remove with collision handling

Compare the approaches and analyze their complexity!

---

## Additional Resources

- **Big O Notation**: Learn more about time/space complexity
- **Tail Recursion**: Optimized recursion (not supported in JavaScript)
- **Memoization**: Caching recursive results for performance
- **Dynamic Programming**: Optimizing recursive algorithms

---

*This guide covers the fundamental concepts discussed. Keep practicing and referring back to this document as you learn more algorithms!*
