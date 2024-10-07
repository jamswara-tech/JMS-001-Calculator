// importing the express module
const express = require('express');
// creating an instance of an express app
const app = express();

// Middleware to parse URL-encoded data from POST requests
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // Respond with an HTML form
    res.send(`
        <form action="/calculate" method="POST">
            <label>First Number: <input type="number" name="num1" step="any" required></label><br>
            <label>Second Number: <input type="number" name="num2" step="any" required></label><br>
            <label>Operation:
                <select name="operation" required>
                    <option value="add">Addition (+)</option>
                    <option value="subtract">Subtraction (-)</option>
                    <option value="multiply">Multiplication (*)</option>
                    <option value="divide">Division (/)</option>
                    <option value="modulus">Modulus (%)</option>
                    <option value="exponent">Exponentiation (^)</option>
                </select>
            </label><br>
            <button type="submit">Calculate</button>
        </form>
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