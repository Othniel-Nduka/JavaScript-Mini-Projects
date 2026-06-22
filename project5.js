//Adventure Game created by DeepSeek

const prompt = require('prompt-sync')();

// ──────────────────────────────────────
// GAME CONFIGURATION
// ──────────────────────────────────────
const CONFIG = {
  totalSteps: 15,
  startingEnergy: 100,
  startingAlertness: 100
};

// ──────────────────────────────────────
// GAME STATE
// ──────────────────────────────────────
let state = {
  step: 1,
  energy: CONFIG.startingEnergy,
  alertness: CONFIG.startingAlertness,
  inventory: [],
  minutesLate: 0,
  events: [],
  gameOver: false,
  reachedSchool: false
};

// ──────────────────────────────────────
// PATH GENERATOR
// ──────────────────────────────────────
function generatePaths(step) {
  const paths = [];
  
  // Each step offers 3 paths with different outcomes
  const scenarios = getScenario(step);
  
  for (let i = 0; i < 3; i++) {
    paths.push({
      number: i + 1,
      description: scenarios[i].description,
      hint: scenarios[i].hint,
      outcome: scenarios[i].outcome,
      effect: scenarios[i].effect
    });
  }
  
  return paths;
}

// ──────────────────────────────────────
// SCENARIOS FOR EACH STEP
// ──────────────────────────────────────
function getScenario(step) {
  const allScenarios = {
    1: [ // Step 1: Waking Up
      {
        description: "Jump out of bed immediately when the alarm rings.",
        hint: "💪 Disciplined start",
        outcome: "You feel fresh and ready. Good start!",
        effect: { energy: 5, alertness: 10, minutes: 0, message: "Energy and alertness boosted!" }
      },
      {
        description: "Hit snooze and sleep 10 more minutes.",
        hint: "😴 Risky comfort",
        outcome: "You feel groggy and now you're behind schedule.",
        effect: { energy: -5, alertness: -15, minutes: 10, message: "You lost valuable time and feel sluggish." }
      },
      {
        description: "Check your phone for messages before getting up.",
        hint: "📱 Distracted start",
        outcome: "A friend texted about a test today! You panic-study for 5 minutes.",
        effect: { energy: -10, alertness: 5, minutes: 5, message: "At least you know about the test now." }
      }
    ],
    2: [ // Step 2: Breakfast
      {
        description: "Eat a full healthy breakfast.",
        hint: "🥚 Nutritious choice",
        outcome: "You feel energized and focused.",
        effect: { energy: 20, alertness: 10, minutes: 5, message: "Best decision of the morning!" }
      },
      {
        description: "Grab a quick granola bar and run.",
        hint: "🏃 Fast but light",
        outcome: "It's not much, but it'll hold you over.",
        effect: { energy: 5, alertness: 0, minutes: 0, message: "Not ideal, but you saved time." }
      },
      {
        description: "Skip breakfast entirely.",
        hint: "⏭️ Time-saver",
        outcome: "Your stomach growls as you leave. You feel weak.",
        effect: { energy: -15, alertness: -5, minutes: -5, message: "You saved 5 minutes but feel terrible." }
      }
    ],
    3: [ // Step 3: Getting Dressed
      {
        description: "Wear your prepared uniform from last night.",
        hint: "👔 Prepared",
        outcome: "Quick and efficient. You look sharp.",
        effect: { energy: 5, alertness: 5, minutes: 0, message: "Preparation pays off!" }
      },
      {
        description: "Search for a specific outfit you want to wear.",
        hint: "👗 Stylish but slow",
        outcome: "You find the perfect outfit but wasted 10 minutes.",
        effect: { energy: -5, alertness: 0, minutes: 10, message: "You look great but lost time." }
      },
      {
        description: "Just throw on whatever is clean.",
        hint: "👕 Quick and messy",
        outcome: "You're dressed in record time but mismatched.",
        effect: { energy: 0, alertness: -10, minutes: -5, message: "At least you're fast. Hope nobody notices." }
      }
    ],
    4: [ // Step 4: Weather Check
      {
        description: "Check the weather and bring an umbrella.",
        hint: "☔ Prepared",
        outcome: "Smart move. Dark clouds are forming.",
        effect: { energy: 0, alertness: 5, minutes: 2, item: "Umbrella", message: "You found an Umbrella in the closet!" }
      },
      {
        description: "Ignore the weather and rush out.",
        hint: "⚡ Risky speed",
        outcome: "You leave quickly but the sky looks threatening.",
        effect: { energy: 5, alertness: -10, minutes: -2, message: "You saved time... for now." }
      },
      {
        description: "Wear a hoodie just in case.",
        hint: "🧥 Compromise",
        outcome: "Not full protection but better than nothing.",
        effect: { energy: 0, alertness: 0, minutes: 1, item: "Hoodie", message: "You found a warm Hoodie." }
      }
    ],
    5: [ // Step 5: Route Choice
      {
        description: "Take the main road (longer but safer).",
        hint: "🛣️ Safe route",
        outcome: "Smooth walking. No obstacles.",
        effect: { energy: -5, alertness: 0, minutes: 15, message: "A pleasant walk." }
      },
      {
        description: "Take the shortcut through the park.",
        hint: "🌳 Quick but muddy",
        outcome: "It rained last night. Your shoes get muddy.",
        effect: { energy: -10, alertness: 5, minutes: -5, message: "Faster, but now your shoes are a mess." }
      },
      {
        description: "Run through the back alleys.",
        hint: "🏚️ Fastest but sketchy",
        outcome: "A stray dog barks at you! You sprint past but feel shaken.",
        effect: { energy: -20, alertness: -15, minutes: -10, message: "Fastest route but you're exhausted and scared." }
      }
    ],
    6: [ // Step 6: Lost Item
      {
        description: "Stop and help a neighbor find their lost cat.",
        hint: "🐱 Kind detour",
        outcome: "You find the cat! The neighbor gives you a candy bar.",
        effect: { energy: 10, alertness: 10, minutes: 10, item: "Candy Bar", message: "Kindness rewarded! You got a Candy Bar." }
      },
      {
        description: "Apologize and keep walking.",
        hint: "🚶 Focused",
        outcome: "You feel guilty but stay on schedule.",
        effect: { energy: -5, alertness: 0, minutes: 0, message: "Your conscience stings a little." }
      },
      {
        description: "Pretend you didn't hear them.",
        hint: "🙉 Ignore",
        outcome: "You avoid the detour but feel like a jerk.",
        effect: { energy: 0, alertness: -15, minutes: -2, message: "Guilt clouds your focus." }
      }
    ],
    7: [ // Step 7: Construction Zone
      {
        description: "Wait for the construction crew to let you pass.",
        hint: "⏳ Patient",
        outcome: "You wait 5 minutes but cross safely.",
        effect: { energy: 0, alertness: -5, minutes: 5, message: "Safe but slow." }
      },
      {
        description: "Sneak around the back of the construction site.",
        hint: "🚧 Risky shortcut",
        outcome: "You trip on some gravel and scrape your knee!",
        effect: { energy: -15, alertness: -10, minutes: -3, message: "You saved time but got hurt." }
      },
      {
        description: "Cross the street and take the long way around.",
        hint: "🔄 Safe detour",
        outcome: "It adds time but you avoid all danger.",
        effect: { energy: -10, alertness: 5, minutes: 10, message: "The long way but stress-free." }
      }
    ],
    8: [ // Step 8: Rain Starts
      {
        description: "Open your umbrella and walk calmly.",
        hint: "☔ Requires Umbrella",
        outcome: "You stay dry and composed.",
        effect: { energy: 5, alertness: 5, minutes: 2, requires: "Umbrella", message: "The umbrella was a lifesaver!" },
        fallback: {
          outcome: "You don't have an umbrella! You get soaked.",
          effect: { energy: -10, alertness: -15, minutes: 0, message: "You're drenched and miserable." }
        }
      },
      {
        description: "Pull up your hoodie and power through.",
        hint: "🧥 Requires Hoodie",
        outcome: "Your hoodie keeps you mostly dry.",
        effect: { energy: 0, alertness: 0, minutes: 0, requires: "Hoodie", message: "The hoodie helps a bit." },
        fallback: {
          outcome: "You have nothing to protect you. You're soaked!",
          effect: { energy: -15, alertness: -10, minutes: 0, message: "Cold, wet, and regretting your choices." }
        }
      },
      {
        description: "Take shelter under a store awning and wait it out.",
        hint: "🏪 Safe waiting",
        outcome: "You stay dry but lose 10 minutes.",
        effect: { energy: 0, alertness: 5, minutes: 10, message: "Dry but delayed." }
      }
    ],
    9: [ // Step 9: Bus Option
      {
        description: "Catch the bus (arrives in 3 minutes).",
        hint: "🚌 Public transport",
        outcome: "You ride comfortably and arrive faster.",
        effect: { energy: 10, alertness: 5, minutes: -5, message: "The bus was on time for once!" }
      },
      {
        description: "Keep walking. You don't trust the bus schedule.",
        hint: "🚶 Independent",
        outcome: "You maintain control of your timing.",
        effect: { energy: -10, alertness: 0, minutes: 5, message: "Steady progress on foot." }
      },
      {
        description: "Try to flag down a ride from a passing car.",
        hint: "🚗 Risky hitchhike",
        outcome: "A classmate's mom recognizes you and gives you a ride!",
        effect: { energy: 5, alertness: 10, minutes: -10, message: "Lucky! You got a free ride." }
      }
    ],
    10: [ // Step 10: Street Vendor
      {
        description: "Buy a warm drink from a street vendor.",
        hint: "☕ Refreshing",
        outcome: "The drink warms you up and boosts your spirits.",
        effect: { energy: 15, alertness: 10, minutes: 5, message: "Best coffee ever!" }
      },
      {
        description: "Buy a snack for later.",
        hint: "🍞 Preparedness",
        outcome: "You tuck the snack in your bag.",
        effect: { energy: 0, alertness: 0, minutes: 3, item: "Snack", message: "You got a Snack for later." }
      },
      {
        description: "Keep walking. Save your money.",
        hint: "💰 Frugal",
        outcome: "You save money but miss the energy boost.",
        effect: { energy: 0, alertness: 0, minutes: -5, message: "Frugal but you saved time." }
      }
    ],
    11: [ // Step 11: Friend Encounter
      {
        description: "Walk with your friend and chat.",
        hint: "👋 Social",
        outcome: "Good conversation lifts your mood.",
        effect: { energy: 10, alertness: 5, minutes: 5, message: "Friends make everything better." }
      },
      {
        description: "Wave but keep walking fast.",
        hint: "⚡ Focused",
        outcome: "You stay on track but miss the social boost.",
        effect: { energy: 0, alertness: -5, minutes: -3, message: "Efficient but lonely." }
      },
      {
        description: "Ask to copy their homework (you forgot yours).",
        hint: "📝 Desperate",
        outcome: "They help you out! Crisis averted.",
        effect: { energy: 0, alertness: 15, minutes: 10, message: "Homework secured. Relief!" }
      }
    ],
    12: [ // Step 12: Crossing Guard
      {
        description: "Wait for the crossing guard's signal.",
        hint: "🛑 Patient",
        outcome: "Safe crossing. The guard smiles at you.",
        effect: { energy: 0, alertness: 5, minutes: 3, message: "Safety first." }
      },
      {
        description: "Jaywalk when you see an opening.",
        hint: "🏃 Risky dash",
        outcome: "You make it across but a car honks at you.",
        effect: { energy: -10, alertness: -20, minutes: -3, message: "Reckless! You're shaken." }
      },
      {
        description: "Go to the next intersection with a traffic light.",
        hint: "🚦 Cautious",
        outcome: "Longer walk but fully protected crossing.",
        effect: { energy: -5, alertness: 0, minutes: 8, message: "Better safe than sorry." }
      }
    ],
    13: [ // Step 13: Final Stretch
      {
        description: "Sprint the last two blocks.",
        hint: "🏃 Full speed",
        outcome: "You arrive breathless but on time!",
        effect: { energy: -20, alertness: 10, minutes: -5, message: "Heart pounding but victorious!" }
      },
      {
        description: "Power-walk steadily.",
        hint: "🚶 Sustainable",
        outcome: "You maintain good pace without exhausting yourself.",
        effect: { energy: -5, alertness: 5, minutes: 0, message: "Steady and strong." }
      },
      {
        description: "Stop to catch your breath at a bench.",
        hint: "🪑 Rest",
        outcome: "You feel refreshed but lost valuable minutes.",
        effect: { energy: 15, alertness: -5, minutes: 5, message: "Rested but now you're cutting it close." }
      }
    ],
    14: [ // Step 14: School Gate
      {
        description: "Enter through the main gate proudly.",
        hint: "🏫 Confident",
        outcome: "You walk in with your head held high.",
        effect: { energy: 5, alertness: 10, minutes: 0, message: "You made it with dignity!" }
      },
      {
        description: "Sneak in through the side gate.",
        hint: "🤫 Sneaky",
        outcome: "You avoid attention but feel sneaky.",
        effect: { energy: 0, alertness: -5, minutes: -2, message: "Nobody saw you arrive." }
      },
      {
        description: "Check your phone one last time before entering.",
        hint: "📱 Last check",
        outcome: "You see the time. The bell rang 2 minutes ago!",
        effect: { energy: 0, alertness: -10, minutes: 2, message: "You're officially late." }
      }
    ],
    15: [ // Step 15: Final Decision
      {
        description: "Apologize to the teacher and take your seat quietly.",
        hint: "🙏 Respectful",
        outcome: "The teacher appreciates your honesty.",
        effect: { energy: 5, alertness: 10, minutes: 0, message: "Integrity matters." }
      },
      {
        description: "Make up an elaborate excuse about traffic.",
        hint: "🤥 Deceptive",
        outcome: "The teacher looks skeptical but lets it slide.",
        effect: { energy: 0, alertness: -15, minutes: 0, message: "Your conscience feels heavy." }
      },
      {
        description: "Sneak in while the teacher's back is turned.",
        hint: "🥷 Stealth",
        outcome: "You slip into your seat unnoticed!",
        effect: { energy: 5, alertness: 5, minutes: 0, message: "Smooth move, ninja." }
      }
    ]
  };
  
  return allScenarios[step] || allScenarios[1];
}

// ──────────────────────────────────────
// APPLY EFFECTS
// ──────────────────────────────────────
function applyEffect(effect) {
  state.energy = Math.max(0, Math.min(200, state.energy + (effect.energy || 0)));
  state.alertness = Math.max(0, Math.min(200, state.alertness + (effect.alertness || 0)));
  state.minutesLate += (effect.minutes || 0);
  
  if (effect.item) {
    state.inventory.push(effect.item);
  }
  
  if (effect.message) {
    console.log(`\n📢 ${effect.message}`);
  }
}

// ──────────────────────────────────────
// CHECK REQUIREMENTS
// ──────────────────────────────────────
function checkRequirement(path, choice) {
  if (path.effect.requires && !state.inventory.includes(path.effect.requires)) {
    // Use fallback outcome instead
    if (path.fallback) {
      console.log(`\n❌ You need a ${path.effect.requires}!`);
      console.log(path.fallback.outcome);
      applyEffect(path.fallback.effect);
      return false;
    }
  }
  return true;
}

// ──────────────────────────────────────
// DISPLAY STATUS
// ──────────────────────────────────────
function displayStatus() {
  console.clear();
  console.log('═'.repeat(55));
  console.log('                    🏫  LATE FOR SCHOOL  🏫');
  console.log('═'.repeat(55));
  
  // Progress
  console.log(`\n📍 Step: ${state.step} of ${CONFIG.totalSteps}`);
  const progress = state.step / CONFIG.totalSteps;
  const barLength = 30;
  const filled = Math.floor(progress * barLength);
  console.log(`[${'█'.repeat(filled)}${'░'.repeat(barLength - filled)}]`);
  
  // Stats
  console.log(`\n⚡ Energy:    ${state.energy}/200  [${'▇'.repeat(state.energy/10)}${'░'.repeat(20 - state.energy/10)}]`);
  console.log(`🧠 Alertness: ${state.alertness}/200  [${'▇'.repeat(state.alertness/10)}${'░'.repeat(20 - state.alertness/10)}]`);
  
  // Time
  const timeDisplay = state.minutesLate <= 0 
    ? `${Math.abs(state.minutesLate)} minutes early! 🎉`
    : `${state.minutesLate} minutes late 😰`;
  console.log(`⏰ Time:      ${timeDisplay}`);
  
  // Inventory
  if (state.inventory.length > 0) {
    console.log(`\n🎒 Bag: ${state.inventory.join(' • ')}`);
  } else {
    console.log(`\n🎒 Bag: Empty`);
  }
  
  console.log('─'.repeat(55));
}

// ──────────────────────────────────────
// CHECK GAME OVER CONDITIONS
// ──────────────────────────────────────
function checkGameOver() {
  if (state.energy <= 0) {
    state.gameOver = true;
    state.deathMessage = "You collapsed from exhaustion on the way to school! 😵";
    return true;
  }
  
  if (state.alertness <= 0) {
    state.gameOver = true;
    state.deathMessage = "In your groggy state, you walked into traffic! 🚗💥";
    return true;
  }
  
  if (state.minutesLate > 60) {
    state.gameOver = true;
    state.deathMessage = "You're so late that school is already over. You give up and go home. 🏠";
    return true;
  }
  
  if (state.step > CONFIG.totalSteps) {
    state.reachedSchool = true;
    state.gameOver = true;
    return true;
  }
  
  return false;
}

// ──────────────────────────────────────
// ENDING SEQUENCE
// ──────────────────────────────────────
function showEnding() {
  displayStatus();
  console.log('\n' + '═'.repeat(55));
  
  if (state.reachedSchool) {
    console.log('\n🎉  YOU MADE IT TO SCHOOL!  🎉');
    console.log('\nYou burst through the classroom door...');
    
    if (state.minutesLate <= 0) {
      console.log('✨ You\'re actually EARLY! The teacher is impressed.');
      console.log(`   Energy: ${state.energy} | Alertness: ${state.alertness}`);
      console.log('\n   Rating: ⭐⭐⭐ PERFECT STUDENT');
    } else if (state.minutesLate <= 5) {
      console.log('📝 You slip into your seat just as the bell rings.');
      console.log(`   Energy: ${state.energy} | Alertness: ${state.alertness}`);
      console.log('\n   Rating: ⭐⭐ RIGHT ON TIME');
    } else if (state.minutesLate <= 20) {
      console.log('😅 The teacher gives you a warning look but says nothing.');
      console.log(`   Energy: ${state.energy} | Alertness: ${state.alertness}`);
      console.log('\n   Rating: ⭐ A BIT LATE BUT OKAY');
    } else {
      console.log('😰 You\'re very late. The teacher marks you tardy.');
      console.log(`   Energy: ${state.energy} | Alertness: ${state.alertness}`);
      console.log('\n   Rating: ⚠️ NEEDS IMPROVEMENT');
    }
    
    // Bonus achievements
    if (state.inventory.includes('Candy Bar') && state.inventory.includes('Snack')) {
      console.log('\n   🏆 Achievement: FULLY STOCKED (had both snacks)');
    }
    if (state.energy >= 150 && state.alertness >= 150) {
      console.log('   🏆 Achievement: PEAK PERFORMANCE');
    }
    if (state.minutesLate <= -10) {
      console.log('   🏆 Achievement: TIME BENDER (arrived super early)');
    }
    
  } else {
    console.log(`\n💀  ${state.deathMessage}`);
    console.log(`\n   You made it to step ${state.step} of ${CONFIG.totalSteps}.`);
    console.log(`   Final Energy: ${state.energy} | Alertness: ${state.alertness}`);
    console.log(`   Minutes Late: ${state.minutesLate}`);
    
    if (state.inventory.length > 0) {
      console.log(`   Items lost: ${state.inventory.join(', ')}`);
    }
  }
  
  console.log('\n' + '═'.repeat(55));
}

// ──────────────────────────────────────
// MAIN GAME LOOP
// ──────────────────────────────────────
function playGame() {
  console.clear();
  console.log('═'.repeat(55));
  console.log('                    🏫  LATE FOR SCHOOL  🏫');
  console.log('═'.repeat(55));
  console.log('\nYou wake up to your alarm blaring.');
  console.log('School starts in 30 minutes.');
  console.log('Every choice matters. Choose wisely...');
  console.log('\n⚠️  If Energy or Alertness hit 0, you fail!');
  console.log('⚠️  Don\'t be more than 60 minutes late!');
  console.log('\n─'.repeat(55));
  prompt('\nPress Enter to begin your journey...');
  
  while (!state.gameOver) {
    displayStatus();
    
    const paths = generatePaths(state.step);
    
    console.log(`\n🔀  STEP ${state.step}: Choose your action:\n`);
    
    paths.forEach(p => {
      console.log(`  [${p.number}] ${p.description}`);
      console.log(`      ${p.hint}\n`);
    });
    
    const choice = parseInt(prompt('Your choice (1-3): '));
    
    if (isNaN(choice) || choice < 1 || choice > 3) {
      console.log('\n❌ Please choose 1, 2, or 3.');
      prompt('\nPress Enter to continue...');
      continue;
    }
    
    const chosenPath = paths[choice - 1];
    
    console.log(`\n${chosenPath.outcome}`);
    
    // Check item requirements
    if (!checkRequirement(chosenPath, choice)) {
      // Fallback was applied, proceed
    } else {
      applyEffect(chosenPath.effect);
    }
    
    // Candy bar can restore energy
    if (state.inventory.includes('Candy Bar') && state.energy < 50) {
      console.log('\n🍫 You eat your Candy Bar for a quick energy boost!');
      state.energy += 25;
      state.inventory = state.inventory.filter(i => i !== 'Candy Bar');
    }
    
    // Snack can restore alertness
    if (state.inventory.includes('Snack') && state.alertness < 50) {
      console.log('\n🍞 You eat your Snack. Brain food!');
      state.alertness += 25;
      state.inventory = state.inventory.filter(i => i !== 'Snack');
    }
    
    state.step++;
    
    if (!checkGameOver()) {
      prompt('\nPress Enter to continue...');
    }
  }
  
  showEnding();
  
  // Play again?
  const replay = prompt('\nPlay again? (y/n): ');
  if (replay.toLowerCase() === 'y') {
    resetGame();
    playGame();
  } else {
    console.log('\nThanks for playing! 📚');
    process.exit(0);
  }
}

// ──────────────────────────────────────
// RESET GAME
// ──────────────────────────────────────
function resetGame() {
  state = {
    step: 1,
    energy: CONFIG.startingEnergy,
    alertness: CONFIG.startingAlertness,
    inventory: [],
    minutesLate: 0,
    events: [],
    gameOver: false,
    reachedSchool: false
  };
}

// ──────────────────────────────────────
// START THE GAME
// ──────────────────────────────────────
playGame();