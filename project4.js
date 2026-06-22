//School Adventure Game

const prompt = require("prompt-sync")();

console.log("Welcome to the Late for School Game");
console.log("In this game, you would be given options of paths to choose from and each path has it's own benefits and consequences");


while (true) {
    const playerConsent = prompt("Would you like to start? (y/n): ").toLowerCase();
    if (playerConsent !== "y" || playerConsent !== "n"){
        console.log("Invalid input!");
    }
    if (playerConsent === "y" || playerConsent === "n"){ 
        break;
    }
}
//Start of the game
console.log("Let the games BEGIN! \n");

//Game stats
let energy = 100;
let minutes = 45;
let alertness = 100;
let totalStats = energy + minutes + alertness;
console.log("Total stats as of the begining of the game is " + totalStats + "\n");

console.log("This game is based on a student going to school in the morning, you have a set of stats and your choices would determing the student's fate.");
console.log(`Begining stats include: Energy - ${energy}, Minutes - ${minutes}, Alertness - ${alertness}`);
console.log("INFO: To choose your options pick from 1-3.\n")

//Step 1
console.log("Step 1: Wake Up");
console.log("Option 1: Jump out of bed immediately when the alarm rings.");
console.log("Option 2: Hit snooze and sleep 10 minutes more.")
console.log("Option 3: Don't wake up at all.\n");

while (true) {
    let answer1 = Number(prompt("Enter your choice: "));
    if (answer1 > 3) {
        console.log("Invalid Input");
    } else{
        if (answer1 === 1){
            energy += 5;
            alertness += 10;
            console.log("Fresh and ready for school");
        } else if (answer1 === 2){
            energy -= 5;
            minutes -= 10;
            alertness -= 10;
            console.log("You're feeling groggy and behind schedule");
        } else {
            energy -= 5;
            minutes -= 15;
            alertness -= 12;
            console.log("You're totally behind schedule");
        };
    }
    break;
}

//Step 2
console.log("\nStep 2: Breakfast");
console.log("Option 1: Eat a full Meal.");
console.log("Option 2: Just grab a slice of bread.")
console.log("Option 3: Don't eat breakfast at all.\n");

while (true) {
    let answer2 = Number(prompt("Enter your choice: "));
    if (answer2 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer2 === 1){
            energy += 20;
            alertness += 10;
            minutes -= 15
            console.log("Feeling energized and focused!");
        } else if (answer2 === 2){
            energy -= 5;
            minutes -= 10;
            alertness -= 8;
            console.log("Just light eating.");
        } else {
            energy -= 5;
            minutes -= 15;
            alertness -= 5;
            console.log("You're hungry as you leave for school.");
        };
    }
    break;
}

//Step 3
console.log("\nStep 3: Dressing");
console.log("Option 1: Wear what you prepared last night.");
console.log("Option 2: Look for a particular outfit.")
console.log("Option 3: Just wear whatever you see, clean or not.\n");

while (true) {
    let answer3 = Number(prompt("Enter your choice: "));
    if (answer3 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer3 === 1){
            energy += 5;
            minutes -=5
            alertness += 5;
            console.log("Quick and efficient!");
        } else if (answer3 === 2){
            energy -= 5;
            minutes -= 10;
            alertness -= 8;
            console.log("Found the perfect one, but wasted 10 minutes on it.");
        } else {
            energy -= 5;
            minutes -= 15;
            alertness -= 5;
            console.log("You're hungry as you leave for school.");
        };
    }
    break;
}

//Step 4
console.log("\nStep 4: Weather Check");
console.log("Option 1: Check the weather and bring an umbrella.");
console.log("Option 2: Ignore the weather and rush out.")
console.log("Option 3: Wear a hoodie (just in case).\n");

while (true) {
    let answer4 = Number(prompt("Enter your choice: "));
    if (answer4 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer4 === 1){
            alertness += 8;
            minutes -= 2
            console.log("You see darkclouds forming.");
        } else if (answer4 === 2){
            energy -= 5;
            minutes -= 2;
            alertness -= 10;
            console.log("Risky move.");
        } else {
            energy -= 5;
            minutes -= 1;
            alertness -= 2;
            console.log("Not full protection, but is better than nothing.");
        };
    }
    break;
}

//Step 5
console.log("\nStep 5: Route Check and walk");
console.log("Option 1: Take the main road, long but safer.");
console.log("Option 2: Take the shortcut through the park.")
console.log("Option 3: Run through the back alley.\n");

while (true) {
    let answer5 = Number(prompt("Enter your choice: "));
    if (answer5 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer5 === 1){
            energy -= 10;
            minutes -=15
            console.log("Smooth walking.");
        } else if (answer5 === 2){
            energy -= 10;
            minutes -= 10;
            alertness += 8;
            console.log("Just light eating.");
        } else {
            energy -= 5;
            minutes -= 7;
            alertness -= 15;
            console.log("A stray dog scares you");
        };
    }
    break;
}

//Step 6
console.log("\nStep 6: Bus Choice and Weather chaange");
console.log("Option 1: Use your umbrella and catch the bus (arrives in 3 minues).");
console.log("Option 2: Take shelter under a store and miss the bus, so you keep walking.")
console.log("Option 3: Pull up your hoodie (keeps you mostly dry) and try to hail a passing cary.\n");

while (true) {
    let answer6 = Number(prompt("Enter your choice: "));
    if (answer6 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer6 === 1){
            energy += 10;
            alertness += 5;
            minutes -= 3
            console.log("You stay dry and arrive faster.");
        } else if (answer6 === 2){
            energy -= 2;
            minutes -= 12;
            alertness -= 8;
            console.log("You stay dry but you lose 12 minutes.");
        } else {
            minutes -= 10;
            alertness -= 5;
            console.log("Risky hitchhike, but a classmates mum recognizes you.");
        };
    }
    break;
}

//Step 7
console.log("\nStep 2: School Gate - Finaly Step");
console.log("Option 1: See your friends walk, wave and walk with them.");
console.log("Option 2: Wave but keep walking without meeting up with them.")
console.log("Option 3: You suddenly realize you forgot to complete you assignment.\n");

while (true) {
    let answer7 = Number(prompt("Enter your choice: "));
    if (answer7 > 3) {
        console.log("Invalid Input");
        continue;
    } else{
        if (answer7 === 1){
            energy += 15;
            alertness += 5;
            minutes -= 5
            console.log("Feeling energized, good conversation lifts your mood.");
        } else if (answer7 === 2){
            minutes += 10;
            console.log("You make up for some time lost, however you miss social boost.");
        } else {
            energy -= 5;
            minutes -= 15;
            alertness -= 5;
            console.log("You ask for help from your friends.");
        };
    }
    break;
}

totalStats = energy + minutes + alertness;
console.log("\nTotal stats as of the end of the game is " + totalStats);
