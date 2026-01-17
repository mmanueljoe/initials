const arr = [1, 2, 3, 4, 5];

arr.push(6);
arr.unshift(0);
arr.pop();
arr.shift();
console.log(arr);


// map, filter, reduce, concat, slice and splice

// map: creates a new array with the results of calling a function for each element
const newArr = arr.map(item => item * 2);
console.log(newArr);

// filter: creates a new array with all elements that pass the test implemented by the provided function
const filteredArr = arr.filter(item => item > 3);
console.log(filteredArr);

// reduce: executes a reducer function on each element of the array, resulting in a single value
const reducedArr = arr.reduce((acc, item) => acc + item, 0);
console.log(reducedArr);

// concat: merges two or more arrays, returning a new array
const concatArr = arr.concat([7, 8, 9]);
console.log(concatArr);

// slice: returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
const slicedArr = arr.slice(0, 3);
console.log(slicedArr);

// splice: changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
const splicedArr = arr.splice(0, 3);
console.log(splicedArr);


// sort: sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
const sortedArr = arr.sort((a, b) => a - b);
console.log(sortedArr);

// reverse: reverses the order of the elements of an array in place. This method mutates the array and returns a reference to the same array.
const reversedArr = arr.reverse();
console.log(reversedArr);


// find: returns the value of the first element in the array that satisfies the provided testing function. Otherwise, it returns undefined.
const foundArr = arr.find(item => item > 3);
console.log(foundArr);

// findIndex: returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1.
const foundIndexArr = arr.findIndex(item => item > 3);
console.log(foundIndexArr);

// includes: determines whether an array includes a certain value among its entries, returning true or false as appropriate.
const includesArr = arr.includes(3);
console.log(includesArr);

// every: tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
const everyArr = arr.every(item => item > 0);
console.log(everyArr);

// some: tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
const someArr = arr.some(item => item > 3);
console.log(someArr);

// flat: creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
const flatArr = arr.flat();
console.log(flatArr);

// reduceRight: executes a reducer function on each element of the array, in descending order, resulting in a single value
const reduceRightArr = arr.reduceRight((acc, item) => acc + item, 0);
console.log(reduceRightArr);


// flatMap: creates a new array with the results of calling a function for each element and then flattening the result into a new array.
const flatMapArr = arr.flatMap(item => [item, item * 2]);
console.log(flatMapArr);


// big-O time complexity
// Insert / remove from end: O(1)
// Insert / remove from beginning: O(n)
// Access by index: O(1)
// Search by value: O(n)
