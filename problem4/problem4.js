var x = 5;
// Mathematic way
function sum_to_n_a(n) {
    // your code here
    var s = (n * (n + 1)) / 2;
    return s;
}
// Using loop
function sum_to_n_b(n) {
    // your code here
    var s = 0;
    for (var i = 0; i <= n; i++) {
        s = s + i;
    }
    return s;
}
// Recursive way
function sum_to_n_c(n) {
    // your code here
    if (n === 0)
        return 0;
    return n + sum_to_n_c(n - 1);
}
console.log("Sum a: ", sum_to_n_a(x));
console.log("Sum b: ", sum_to_n_b(x));
console.log("Sum c: ", sum_to_n_c(x));
