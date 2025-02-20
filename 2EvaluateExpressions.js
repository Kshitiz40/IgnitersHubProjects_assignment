const fs = require("fs");

function evaluateExpression(expression) {
    try {
        // Replace ^ with ** for exponentiation
        const sanitizedExpression = expression.replace(/\^/g, "**");
        
        // Evaluate the expression using Function constructor for safety
        const result = new Function(`return (${sanitizedExpression})`)();
        return result;
    } catch (error) {
        return "Error"; // Handle invalid expressions
    }
}

// Read input file
fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    
    const lines = data.split("\n"); // Split by new lines
    const results = lines.map(line => {
        const expression = line.replace(/=\s*$/, "").trim(); // Remove trailing '=' if present
        const answer = evaluateExpression(expression);
        return `${expression} = ${answer}`;
    });
    
    // Write results to output file
    fs.writeFile("output.txt", results.join("\n"), "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Output saved to output.txt");
        }
    });
});