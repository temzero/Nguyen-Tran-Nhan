const x = 4
// Mathematic way
var sum_to_n_a = function (n) {
  const sum = (n * (n + 1)) / 2;
  return sum;
};

// Using loop
var sum_to_n_b = function (n) {
  let sum = 0
  for (let i = 0; i <= n; i++) {
    sum = sum + i;
  }
  return sum
};

// Recursive way
var sum_to_n_c = function (n) {
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
};

console.log("Sum a: ", sum_to_n_a(x));
console.log("Sum b: ", sum_to_n_b(x));
console.log("Sum c: ", sum_to_n_c(x));
