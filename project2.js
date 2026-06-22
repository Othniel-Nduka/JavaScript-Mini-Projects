//Random Number Guesser
const prompt = require("prompt-sync")();

console.log("Welcome to the Number Guessing Games");
console.log("1. Easy (20 Chances)");
console.log("2. Normal (15 Chances)");
console.log("3. Intermediate (10 Chances)");
console.log("4. Hard (5 Chances)");

const userInput = Number(prompt("Enter your difficulty: "));
let difficulty1 = 20;
let difficulty2 = 15;
let difficulty3 = 10;
let difficulty4 = 5;

const targetNumber = Math.round(Math.random() * 100);
let guesses = 0;

switch (userInput) {
    case 1:
        while (guesses < difficulty1) {
            const guess = Number(prompt("Guess a random number (0-100): "));
            if (guess > targetNumber) {
                console.log("Your guess is to high!");
                console.log("Guess again!")
                guesses++;
            } else if (guess < targetNumber) {
                console.log("Your guess is too low!");
                console.log("Guess again!")
                guesses++;
            } else {
                console.log(`Correct! The correct number is ${guess}. It took you ${guesses} time(s) to get it correctly`);
                break;
            }
        };
        if (guesses == difficulty1) {
            console.log(`Uhuhn, you have failed to guess the number in your maximum amount of tries (${guesses})`);
        }
        break;
    case 2:
        while (guesses < difficulty2) {
            const guess = Number(prompt("Guess a random number (0-100): "));
            if (guess > targetNumber) {
                console.log("Your guess is to high!");
                console.log("Guess again!")
                guesses++;
            } else if (guess < targetNumber) {
                console.log("Your guess is too low!");
                console.log("Guess again!")
                guesses++;
            } else {
                console.log(`Correct! The correct number is ${guess}. It took you ${guesses} time(s) to get it correctly`);
                break;
            }
        };
        console.log(`Uhuhn, you have failed to guess the number in your maximum amount of tries (${guesses})`);
        break;
    case 3:
        while (guesses < difficulty3) {
            const guess = Number(prompt("Guess a random number (0-100): "));
            if (guess > targetNumber) {
                console.log("Your guess is to high!");
                console.log("Guess again!")
                guesses++;
            } else if (guess < targetNumber) {
                console.log("Your guess is too low!");
                console.log("Guess again!")
                guesses++;
            } else {
                console.log(`Correct! The correct number is ${guess}. It took you ${guesses} time(s) to get it correctly`);
                break;
            }
        };
        if (guesses == difficulty1) {
            console.log(`Uhuhn, you have failed to guess the number in your maximum amount of tries (${guesses})`);
        }
        break;
    case 4:
        while (guesses < difficulty4) {
            const guess = Number(prompt("Guess a random number (0-100): "));
            if (guess > targetNumber) {
                console.log("Your guess is to high!");
                console.log("Guess again!")
                guesses++;
            } else if (guess < targetNumber) {
                console.log("Your guess is too low!");
                console.log("Guess again!")
                guesses++;
            } else {
                console.log(`Correct! The correct number is ${guess}. It took you ${guesses} time(s) to get it correctly`);
                break;
            }
        };
        if (guesses == difficulty4) {
            console.log(`Uhuhn, you have failed to guess the number in your maximum amount of tries (${guesses})`);
        }
        break;
}








