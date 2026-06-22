//Simple Quiz Game - By Tech with Tom
//This is my Revised Quiz tho

const prompt = require("prompt-sync")()

console.log("Welcome to the Computer Hardware Quiz!");

const question1 = prompt("Question 1: What does CPU stand for? ");
const answer = "Central Processing Unit";

const question2 = prompt("Question 2: What does RAM stand for? ");
const answer2 = "Random Access Memory";

const question3 = prompt("Question 3: What does ROM stand for? ");
const answer3a = "Read-Only Memory";
const answer3b = "Read Only Memory"

const question4 = prompt("Question 4: What is the recommended amount of RAM in 2026? ");
const answer4 = "16GB";

const question5 = prompt("Question 5: What is the brain of the Computer? ");
const answer5 = "CPU";

let score = 0;

if (question1.toLowerCase() === answer.toLowerCase()) {
    console.log("Correct! The CPU is Central Processing Unit.");
    score++;
} else {
    console.log("Incorrect. The CPU stands for Central Processing Unit.");
}

if (question2.toLowerCase() === answer2.toLowerCase()) {
    console.log("Correct! RAM stands for Random Access Memory.");
    score++;
} else {
    console.log("Incorrect. RAM stands for Random Access Memory.");
}

if (question3.toLowerCase() === answer3a.toLowerCase() || question3.toLowerCase() === answer3b.toLowerCase()) {
    console.log("Correct! ROM stands for Read-Only Memory.");
    score++;
} else {
    console.log("Incorrect. ROM stands for Read-Only Memory.");
}

if (question4.toLowerCase() === answer4.toLowerCase()){
    console.log("Correct! The recommended amount of RAM needed is 16GB");
    score++;
} else{
    console.log("Incorrect. The Recommended amount is 16gb");
}

if (question5.toLowerCase() === answer5.toLowerCase()) {
    console.log("Correct! The answer is the CPU");
    score++;
} else {
    console.log("Incorrect! The correct answer is CPU");
}

console.log(`Your final score is: ${score}/5`);
