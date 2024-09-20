const fs = require('fs');

// Read the contents of myResult.txt
const results = fs.readFileSync('results.txt', 'utf8');

// Extract execution time for Node.js and Bun.js using regex
const nodeExecutionTime = results.match(/Node\.js Benchmark[\s\S]*?Execution Time: (\d+\.\d+)ms/);
const bunExecutionTime = results.match(/Bun\.js Benchmark[\s\S]*?Execution Time: (\d+\.\d+)ms/);
const nodeResult = results.match(/Node\.js Benchmark[\s\S]*?Result: (\d+\.\d+)/);
const bunResult = results.match(/Bun\.js Benchmark[\s\S]*?Result: (\d+\.\d+)/);

// Check if the execution times and results were extracted successfully
const nodeTime = nodeExecutionTime ? parseFloat(nodeExecutionTime[1]) : NaN;
const bunTime = bunExecutionTime ? parseFloat(bunExecutionTime[1]) : NaN;
const nodeResultValue = nodeResult ? nodeResult[1] : 'N/A';
const bunResultValue = bunResult ? bunResult[1] : 'N/A';

// Determine which one is faster and by how much
let fasterEnvironment = 'N/A';
let percentageDifference = 'N/A';

if (!isNaN(nodeTime) && !isNaN(bunTime)) {
    if (nodeTime < bunTime) {
        fasterEnvironment = 'Node.js is faster';
        percentageDifference = (((bunTime - nodeTime) / bunTime) * 100).toFixed(2);
    } else if (bunTime < nodeTime) {
        fasterEnvironment = 'Bun.js is faster';
        percentageDifference = (((nodeTime - bunTime) / nodeTime) * 100).toFixed(2);
    } else {
        fasterEnvironment = 'Both are equally fast';
        percentageDifference = '0.00';
    }
}

// Create the HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bun.js vs Node.js Benchmark Report</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Bun.js vs Node.js Benchmark Report</h1>
    <table>
        <thead>
            <tr>
                <th>Environment</th>
                <th>Execution Time</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Node.js</td>
                <td>${nodeTime} ms</td>
                <td>${nodeResultValue}</td>
            </tr>
            <tr>
                <td>Bun.js</td>
                <td>${bunTime} ms</td>
                <td>${bunResultValue}</td>
            </tr>
        </tbody>
    </table>
    <h2>Conclusion: ${fasterEnvironment}</h2>
    <p>The faster environment is ${fasterEnvironment}. It is faster by ${percentageDifference}%.</p>
</body>
</html>
`;

// Write the HTML content to a file named report.html
fs.writeFileSync('report.html', htmlContent);

console.log('HTML report generated: report.html');
