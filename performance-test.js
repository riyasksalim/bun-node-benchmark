// performance-test.js

const isBun = typeof Bun !== 'undefined'; // Check if running on Bun.js

console.time("Execution Time");

// CPU-bound task for benchmarking
let sum = 0;
for (let i = 0; i < 5e8; i++) {
  sum += Math.sqrt(i);
}

console.timeEnd("Execution Time");

console.log(`Result: ${sum}`);

// For Bun.js, explicitly log the execution time in the same format
if (isBun) {
  const start = performance.now();
  for (let i = 0; i < 5e8; i++) {
    sum += Math.sqrt(i);
  }
  const end = performance.now();
  const executionTime = end - start;
  console.log(`Execution Time: ${executionTime.toFixed(3)}ms`);
}
