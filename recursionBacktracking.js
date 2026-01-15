function flattenArray(arr){
    const result = [];

    for(const item of arr){
        if(Array.isArray(item)){
            result.push(...flattenArray(item));
        }else{
            result.push(item);
        }
    }

    return result;
}

console.log(flattenArray([1,[2,[3,4]],5]));


// function generateParenthesis(n){
//     const result = [];
//     if (n < 1 && n >= 8) return result;

//     function backtrack(current, open, close){
//         if (open === n && close === n){
//             result.push(current);
//             return;
//         }

//         if (open < n){
//             return backtrack(current + '(', open + 1, close);
//         }

//         if(close < open){
//             return backtrack(current + ')', open, close + 1);
//         }

//     }

//     backtrack('', 0, 0);
//     return result;
// }

// console.log(generateParenthesis(8));


function generateParenthesis(n) {
  const res = []; // collect valid strings

  // cur: current string being built
  // open: count of '(' used so far
  // close: count of ')' used so far
  function backtrack(cur, open, close) {
    // If we've used all n '(' and all n ')', cur is a complete valid string
    if (open === n && close === n) {
      res.push(cur);
      return; // stop exploring this path
    }

    // Option 1: add '(' if we still have some left to use
    if (open < n) {
      backtrack(cur + '(', open + 1, close);
    }

    // Option 2: add ')' only if it keeps the string valid (can't close more than we've opened)
    if (close < open) {
      backtrack(cur + ')', open, close + 1);
    }
  }

  // Start with empty string and zero counts
  backtrack('', 0, 0);

  // Return all collected valid combinations
  return res;
}

console.log(generateParenthesis(4));




/**
 * Linear Search: Check each element one by one.
 * @param {string[]} receipt - array of item names
 * @param {string} target - item to find
 * @returns {number} index if found; -1 otherwise
 */
function findItem(receipt, target) {
  for (let i = 0; i < receipt.length; i++) {
    if (receipt[i] === target) {
      return i; // found at index i
    }
  }
  return -1; // not found
}



/**
 * Binary Search: Works only on a sorted array (ascending).
 * @param {number[]} arr - sorted array
 * @param {number} target - value to find
 * @returns {number} index if found; -1 otherwise
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // midpoint (avoid (left + right) / 2 rounding issues)
    const mid = left + Math.floor((right - left) / 2);
    const value = arr[mid];

    if (value === target) {
      return mid; // found!
    } else if (value < target) {
      // target is in the right half
      left = mid + 1;
    } else {
      // value > target: target is in the left half
      right = mid - 1;
    }
  }

  // not found
  return -1;
}






// // typical n-queens problem - place n queens on an nxn chessboard so that no two queens can attack each other
function isSafe(){
    //check if a queen can be placed at (row, col) safely
    // check the current row and column

    for (let i = 0; i < N; i++){
        if (board[i][col] === 'Q' || board[row][i] === 'Q'){
            return false;
        }
    }

    // check diagonals
    for (let i = row, j = col; i >=0 && j >= 0; i--, j--){
        if(board[i][j] === 'Q'){
            return false;
        }
    }

    for (let i = row, j = col; i >= 0 && j < N; i--, j++){
        if(board[i][j] === 'Q'){
            return false;
        }
        return true;
    }

    function solveNQueens(N) {
        const board = Array.from({length: N}, () => Array(N).fill('.'));
        const solutions = [];

        function backtrack(row){
            if(row === N){
                solutions.push(board.map(row => row.join('')))
            }

            for(let col = 0; col < N; col++){
                if(isSafe(board, row, col, N)){
                    board[row][col] = 'Q';
                    backtrack(row + 1);
                    board[row][col] = '.'
                }
            }
        }
    }

    backtrack(0);
    return solutions;
}



// dsa challenge

// the problem: 'the megacorp employee search'

/* 
the story:
you are building a search bar for a huge company called megacorp.
the company is split into Departments(like Sales, Engineering, HR),
inside each department, there can be sub-departments (e.g., 'Engineering' there is 'Mobile', 'Web' and 'AI').
every department has employees:
  1. the interns(messy list): a small list of new interns. these ids are not in order because they are added randomly.
  2. the managers(neat list): a huge list of permanent managers. these ids are sorted (101, 102, 103...) to make them easy find

your job: write a function that searches the entire company (every deparrmen and sub-department) to find if Employee ID #88 exists.

sample data:

const megacorpData = {
  name: 'MegaCorp HQ',
  interns: [502, 12, 99],
  managers: [1000, 2000, 3000],
  subDeparments: [
    {
      name: 'Sales',
      interns: [4, 1, 75],
      managers: [101, 102, 103, 104],
      subDeparments: []
      },
    {
      name: 'Engineering',
      interns: [42, 15, 75],
      managers: [500, 505, 510],
      subDeparments: [
        {
          name: 'Web Development ',
          interns: [33, 19],
          managers: [600, 601],
          subDeparments: []
        },
        {
          name: 'AI Division',
          interns: [5, 9, 88, 2],
          managers: [700, 705, 710],
          subDeparments: []
        }
      ]
    },
    {
      name: 'HR',
      interns: [],
      managers: [800, 801, 802],
      subDeparments: []
      }
}
*/

// what is the best search method for interns? linear search
// what is the best search method for managers? binary search

// why linear search? 
// is this a recursion problem? yes, because we have sub-departments inside departments

function findEmployee(department, employeeId){
  // If an array of departments was passed, search each one
  if (Array.isArray(department)) {
    for (const dept of department) {
      if (findEmployee(dept, employeeId)) return true;
    }
    return false;
  }

  // defensive guards for unexpected input
  if (!department || typeof department !== 'object') return false;

  // search interns (linear)
  const interns = Array.isArray(department.interns) ? department.interns : [];
  for (const internId of interns) {
    if (internId === employeeId) return true;
  }

  // search managers (binary search) - ensure we have an array
  const managers = Array.isArray(department.managers) ? department.managers : [];
  let left = 0;
  let right = managers.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const managerId = managers[mid];
    if (managerId === employeeId) return true;
    else if (managerId < employeeId) left = mid + 1;
    else right = mid - 1;
  }

  // search in sub-departments (handle different possible key names)
  const subKey = Array.isArray(department.subDeparments)
    ? 'subDeparments'
    : Array.isArray(department.departments)
    ? 'departments'
    : null;

  if (subKey) {
    for (const subDept of department[subKey]) {
      if (findEmployee(subDept, employeeId)) return true;
    }
  }

  return false;
}


const megacorpData = {
  name: 'MegaCorp HQ',
  interns: [502, 12, 99],
  managers: [1000, 2000, 3000],
  departments: [
    {
      name: 'Sales',
      interns: [4, 1, 75],
      managers: [101, 102, 103, 104],
      subDeparments: []
    },
    {
      name: 'Engineering',
      interns: [42, 15, 75],
      managers: [500, 505, 510],
      subDeparments: [
        {
          name: 'Web Development ',
          interns: [33, 19],
          managers: [600, 601],
          subDeparments: []
        },
        {
          name: 'AI Division',
          interns: [5, 9, 88, 2],
          managers: [700, 705, 710],
          subDeparments: []
        }
      ]
    },
    {
      name: 'HR',
      interns: [],
      managers: [800, 801, 802],
      subDeparments: []
    }
  ]
}

console.log(findEmployee(megacorpData, 88)); // true
