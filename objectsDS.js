const obj = {
    name: 'John',
    age: 30,
    city: 'New York'
};

console.log(obj);

// access properties
console.log(obj.name);
console.log(obj.age);
console.log(obj.city);

// add properties
obj.email = 'john@example.com';
console.log(obj);

// remove properties
delete obj.email;
console.log(obj);

// big-O time complexity
// Access: O(1)
// Insert: O(1)
// Remove: O(1)
// Search: O(n)
// Search by key: O(1)
// Search by value: O(n)
// Search by key: O(1)