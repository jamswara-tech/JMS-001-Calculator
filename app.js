// Example app.js using Express
const express = require('express');
const app = express();

// Use the port Heroku provides or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    // Respond with a simple HTML form or result of an addition
    res.send(`
        <form action="/add" method="GET">
            <label>First Number: <input type="number" name="num1"></label><br>
            <label>Second Number: <input type="number" name="num2"></label><br>
            <button type="submit">Add</button>
        </form>
    `);
});

app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
