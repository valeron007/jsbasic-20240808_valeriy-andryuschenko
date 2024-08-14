function factorial(n) {
  if(n < 0) return NaN
  if(n === 0 ) return 1;
  if(n === 1 ) return 1;

  return n * factorial(n - 1);
}

let fact = factorial(5)
console.log(fact);
