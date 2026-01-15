// fibonacci sequence

function fibonacci(n) {
  if (n === 0) return n;
  if (n === 1) return n;

  // Correct formula: fib(n) = fib(n-1) + fib(n-2)
  return fibonacci(n - 1) + fibonacci(n - 2);
}


// question: given a value of n return the first n numbers in the fibonnaci sequence
function fibonacciSeriesN(n) {
  const fib = [0, 1];

  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib;
}




// factorial
function factorial(n){

  if (n < 0) return 0;

  if (n === 0 || n === 1) return 1;

  if(n % 1 !== 0){
    return null;
  }

  return n * factorial(n - 1);
}



// second - efficient approach
function factorialLoop(n){
  let result = 1;

  for(let i = 2; i <= n; i++){
    result *= i;
  }

  return result;
}


// determine if a number is prime
function isPrime(n){

  if(n <= 1) return false;

  if(typeof n !== 'number' || Number.isNaN(n)) return false;

  let factors = [];

  for(let i = 1; i <= n; i++){
    if(n % i == 0){
      factors.push(i);
    }
  }

  return factors.length === 2;
}



// efficient approach
function isPrimeA(n){
  if(typeof n !== 'number' || Number.isNaN(n)) return false;
  if(!Number.isInteger(n)) return false;
  if(n <= 1) return false;
  if(n === 2) return true;
  if(n % 2 === 0) return false;

  // only check odd divisors up to sqrt(n)
  const limit = Math.sqrt(n);
  for(let i = 3; i <= limit; i += 2){
    if(n % i === 0) return false;
  }

  return true;
}


// not optimized
function isPrimeB(n){
  if(n < 2){
    return false;
  }

  for(let i = 2; i < n; i++) {
    if(n % i === 0){
      return false;
    }
  }

  return true;
}



// power of two
function isPowerOfTwo(n){
  if(n < 1){
    return false;
  }

  while(n > 1){
    if(n % 2 !== 0 ){
      return false;
    }

    n = n / 2;
  }

  return true;
}

// with bitwise (optimized)
function isPowerOfTwoBitWise(n){
  if(n < 1) return false;

  return (n & (n - 1)) === 0;
}

