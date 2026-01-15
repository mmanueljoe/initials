// let jsonTxt = '{"firstName":"John", "lastName":"Doe"}';

// const obj = JSON.parse(jsonTxt);

// console.log(obj);


// const jsonObj = {
// "employees":[
//   {"firstName":"John", "lastName":"Doe"},
//   {"firstName":"Anna", "lastName":"Smith"},
//   {"firstName":"Peter", "lastName":"Jones"}
// ]
// }

// const strg = JSON.stringify(jsonObj);

// console.log(strg);



// const someArr = [1,2]
// console.log(someArr.entries());

// console.log(jsonObj.employees[0].firstName);

// const yetAnotherArr = jsonObj.employees;

// yetAnotherArr.map((person) => {
//     console.log(`${person.firstName} ${person.lastName}`);
// });


// data-loader.mjs
// This would cause an error in CommonJS or in a script
// But works at the top level in an ES Module

// console.log('Loading data...');

// Top-level await - the module's execution pauses here
// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await response.json();

// console.log('Data loaded!');

// export { data };

// When another module imports this one, it will only get the exports
// after all the top-level await operations have completed


const promise1 = new Promise((resolve) => setTimeout(() => resolve('This promise was resolved!'), 5000));

console.log(typeof(promise1));

console.log(promise1)