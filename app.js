// app.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask the user for a number
function askNumber(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(parseFloat(answer));
    });
  });
}

async function addNumbers() {
  try {
    const num1 = await askNumber('Enter the first number: ');
    const num2 = await askNumber('Enter the second number: ');
    const sum = num1 + num2;
    console.log(`The sum of ${num1} and ${num2} is ${sum}`);
    rl.close();
  } catch (error) {
    console.error('Invalid input, please enter numbers only.');
    rl.close();
  }
}

addNumbers();
