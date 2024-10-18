// importing the express module
const express = require('express');
// creating an instance of an express app
const app = express();
const path = require('path');

// Middleware to parse URL-encoded data from POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
    // Respond with an HTML form
    res.send(`
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
                <h1 class="text-3xl font-semibold mb-8 text-center text-gray-800">Calculator</h1>
                <form action="/calculate" method="POST" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">First Number:</label>
                        <input type="number" name="num1" step="any" required class="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label class="block text-gray-700">Second Number:</label>
                        <input type="number" name="num2" step="any" required class="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label class="block text-gray-700">Operation:</label>
                        <select name="operation" required class="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="add">Addition (+)</option>
                            <option value="subtract">Subtraction (-)</option>
                            <option value="multiply">Multiplication (*)</option>
                            <option value="divide">Division (/)</option>
                            <option value="modulus">Modulus (%)</option>
                            <option value="exponent">Exponentiation (^)</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors">Calculate</button>
                </form>
            </div>
        </div>
    `);
});

app.post('/calculate', (req, res) => {  
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operation = req.body.operation;
    let result;
    let operationSymbol;

    // Perform the calculation based on the operation
    switch (operation) {
        case 'add':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                return res.send('Error: Division by zero is not allowed!');
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        case 'modulus':
            result = num1 % num2;
            operationSymbol = '%';
            break;
        case 'exponent':
            result = Math.pow(num1, num2);
            operationSymbol = '^';
            break;
        default:
            return res.send('Error: Invalid operation!');
    }

    // Display the result
    res.send(`
        <p>The result of ${num1} ${operationSymbol} ${num2} is: <strong>${result}</strong></p>
        <a href="/">Perform another calculation</a>
    `);
});

// Use the port Heroku provides or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});