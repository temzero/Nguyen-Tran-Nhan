const x: number = 5

// Mathematic way
function sum_to_n_a(n: number): number {
	// your code here
	const sum: number = (n * (n + 1)) / 2;
	return sum
}

// Using loop
function sum_to_n_b(n: number): number {
	// your code here
	let sum: number = 0
	for (let i = 0; i <= n; i++) {
	  sum = sum + i;
	}
	return sum
}

// Recursive way
function sum_to_n_c(n: number): number {
	if (n === 0) return 0;
	return n + sum_to_n_c(n - 1);
}

console.log("Sum a: ", sum_to_n_a(x));
console.log("Sum b: ", sum_to_n_b(x));
console.log("Sum c: ", sum_to_n_c(x));