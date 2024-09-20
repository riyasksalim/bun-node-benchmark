#!/bin/bash

# Run Node.js benchmark
echo "Running Node.js performance test..."
echo "## Node.js Benchmark" > results.txt
node performance-test.js | tee -a results.txt

# Run Bun.js benchmark
echo "Running Bun.js performance test..."
echo "## Bun.js Benchmark" >> results.txt
bun run performance-test.js | tee -a results.txt

# Generate the HTML report
echo "Generating HTML report..."
node generate-report.js

# Inform the user
echo "Benchmark complete! Check the report.html file for results."
