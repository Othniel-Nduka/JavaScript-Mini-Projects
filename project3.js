//Rock Paper Scissors

const prompt = require("prompt-sync")();

console.log("Welcome to the Rock Paper Scissors Game");
console.log("This is a game between you and the computer");
console.log("1. 5 Chances");
console.log("2. 3 Chances");
console.log("3. 2 Chances");
console.log("4. 1 Chances");
console.log("Or enter q to Quit")
const userInput = Number(prompt("Choose your difficulty: "));

const difficulty1 = 5;
const difficulty2 = 3;
const difficulty3 = 2;
const difficulty4 = 1;


let wins = 0;
let losses = 0;
let ties = 0;
let tries = 0;


//The computer choosing playing option
const choices = ["rock", "paper", "scissors"];
const random = Math.round(Math.random() * 2);
const computerChoice = choices[random];

switch (userInput) {
    case "q":
        console.log("You have exited the game.");
        break;
    case 1:
        while (tries < difficulty1) {
            //The user playing option
            let playerChoice = prompt("Pick - Rock, Paper, Scissors: ").toLowerCase();
            if (playerChoice !== "rock" && playerChoice !== "paper" && playerChoice !== "scissors") {
                console.log("Invalid input")
                continue;
            }
            if (playerChoice === computerChoice) {
                console.log("We have a tie!");
                ties++;
                tries++;
            } else if ((playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" &&
            computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors")) {
                console.log("You have won!");
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
                wins++;
                tries++;
            } else{
                console.log("You have lost!")
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
                tries++;
                losses++;
            }
        } 
        if (tries === difficulty1){
            console.log("Uhuhn, you have exceeded your number of attempts.");
            console.log(`You had a total of ${wins} wins, ${ties} ties, and ${losses} losses.`);
            break;
        }
    case 2:
        while (tries < difficulty2) {
            //The user playing option
            let playerChoice = prompt("Pick - Rock, Paper, Scissor: ").toLowerCase();
            if (playerChoice !== "rock" && playerChoice !== "paper" && playerChoice !== "scissors") {
                console.log("Invalid input");
                continue;
            }
            if (playerChoice === computerChoice) {
                console.log("We have a tie!");
                ties++;
                tries++;
            } else if ((playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" &&
            computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors")) {
                console.log("You have won!");
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
                wins++;
                tries++
            } else{
                console.log("You have lost!")
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
            }
        } 
        if (tries === difficulty2){
            console.log("Uhuhn, you have exceeded your number of attempts.");
            console.log(`You had a total of ${wins} wins, ${ties} ties, and ${losses} losses.`);
            break;
        }
    case 3:
        while (tries < difficulty3) {
            //The user playing option
            let playerChoice = prompt("Pick - Rock, Paper, Scissor: ").toLowerCase();
            if (playerChoice !== "rock" && playerChoice !== "paper" && playerChoice !== "scissors") {
                console.log("Invalid input");
                continue;
            }
            if (playerChoice === computerChoice) {
                console.log("We have a tie!");
                ties++;
                tries++;
            } else if ((playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" &&
            computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors")) {
                console.log("You have won!");
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
                wins++;
                tries++
            } else{
                console.log("You have lost!")
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
            }
        } 
        if (tries === difficulty3){
            console.log("Uhuhn, you have exceeded your number of attempts.");
            console.log(`You had a total of ${wins} wins, ${ties} ties, and ${losses} losses.`);
            break;
        }
    case 4:
        while (tries < difficulty4) {
            //The user playing option
            let playerChoice = prompt("Pick - Rock, Paper, Scissor: ").toLowerCase();
            if (playerChoice !== "rock" && playerChoice !== "paper" && playerChoice !== "scissors") {
                console.log("Invalid input");
                continue;
            }
            if (playerChoice === computerChoice) {
                console.log("We have a tie!");
                ties++;
                tries++;
            } else if ((playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" &&
            computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors")) {
                console.log("You have won!");
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
                wins++;
                tries++
            } else{
                console.log("You have lost!")
                console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
            }
        } 
        if (tries === difficulty4){
            console.log("Uhuhn, you have exceeded your number of attempts.");
            console.log(`You had a total of ${wins} wins, ${ties} ties, and ${losses} losses.`);
            break;
        }
}

//Game logic
// while (true) {
//     if (playerChoice === computerChoice) {
//         console.log("We have a tie!");
//         ties++;
//     } else if ((playerChoice === "scissors" && computerChoice === "paper") || (playerChoice === "paper" &&
//     computerChoice === "rock") || (playerChoice === "rock" && computerChoice === "scissors")) {
//         console.log("You have won!");
//         wins++;
//     } else{
//         console.log("You have lost!")
//         console.log(`You picked ${playerChoice} and the computer picked ${computerChoice}`);
//         break;
//     }
// } 