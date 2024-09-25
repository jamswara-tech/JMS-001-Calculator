// importing the express module(web framework for node.js)
const express = require('express');
//creating an instance of an express app by calling express()
const app = express();

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

// app.get('/', (req, res) => {
//     // Respond with a simple HTML form or result of an addition
//     res.send(`
//         <form action="/subtract" method="GET">
//             <label>First Number: <input type="number" name="num1"></label><br>
//             <label>Second Number: <input type="number" name="num2"></label><br>
//             <button type="submit">Subtract</button>
//         </form>
//     `);
// });
// app.get('/subtract', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const Subtract = num1 - num2;
//     res.send(`The difference between ${num1} and ${num2} is ${Subtract}`);
// });

// Use the port Heroku provides or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
