// 1. let player know what is the earning goal for the day, timer display for 3 seconds
// 1. timer starts
// 2. ingredient sequence prompt from game
// 3. player key in sequence of ingredients
// 4. if correct order of sequence => money counter adds $5 => player input clears => step 2
// 5. if wrong order of sequence => player input vibrates? or change colour? player input clears
// 6. timer stops
// 7. show how much money player earns, restart button, continue button, main menu button
// 8. if player lose continue button is disabled, player can only restart or go back to main menu
// if player restarts same timer duration happens
// if player continues timer with lesser duration happens

// display timer and result
const timerElement = document.querySelector("#timer");
const displayResult = document.querySelector("#result");
displayResult.style.visibility = "hidden";

// timer function (to change timer duration => change value of duration variable)
let timerDisplay = setInterval(updateTimer, 1000);
console.log("time starts");

let duration = 60;
function updateTimer() {
  const minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = seconds;
  }

  timerElement.innerText = minutes + ":" + seconds;
  duration--;

  if (duration < 0) {
    duration = 0;
    displayResult.style.visibility = "visible";
    clearInterval(timerDisplay);
    console.log("times up");
  }
}

const ingredients = ["mushroom", "chicken", "kani", "ebi", "tamago", "kawaebi"];

let computerSequence = [];

// random computer sequence generator
function randomIngredients() {
  computerSequence.length = 0;
  for (let i = 0; i < 6; i++) {
    const getRandomIngredient =
      ingredients[Math.floor(Math.random() * ingredients.length)];
    computerSequence.push(getRandomIngredient);
  }
}
randomIngredients();
console.log(computerSequence);

// player inputs
let playerSequence = [];

const userInput = document.addEventListener(
  "keydown",
  function (e) {
    e.preventDefault();

    if (e.code === "KeyW") {
      playerSequence.push("mushroom");
    } else if (e.code === "KeyA") {
      playerSequence.push("chicken");
    } else if (e.code === "KeyD") {
      playerSequence.push("kani");
    } else if (e.code === "KeyJ") {
      playerSequence.push("tamago");
    } else if (e.code === "KeyI") {
      playerSequence.push("ebi");
    } else if (e.code === "KeyL") {
      playerSequence.push("kawaebi");
    } else if (e.code === "Backspace") {
      playerSequence.length = 0;
      if (duration <= 5) {
        duration = 0;
      } else {
        duration -= 5;
      }
    } else if (e.code === "Enter") {
      submitDish(playerSequence, computerSequence);
    } else {
      return;
    }

    console.log(playerSequence);
  },
  true
);

// player earnings
let totalMoneyEarn = 0;
const refund = 15;
const customerPays = 15;

// update counter
function updateCounter() {
  const targetCounter = document.querySelector("#counter");
  targetCounter.innerText = "$" + totalMoneyEarn + ".00";
}

// update pop up result counter
function updateResultCounter() {
  const targetResultCounter = document.querySelector(".player-earnings");
  targetResultCounter.innerText = "$" + totalMoneyEarn + ".00";
}

// check to see if player input is correct or not
function submitDish(playerDish, computerDish) {
  if (playerDish.length !== computerDish.length) {
    totalMoneyEarn -= refund;
    updateCounter();
    updateResultCounter();
    return console.log("You made the wrong dish");
  } else {
    for (let i = 0; i < playerDish.length; i++) {
      if (playerDish[i] !== computerDish[i]) {
        totalMoneyEarn -= refund;
        updateCounter();
        updateResultCounter();
        return console.log("You made the wrong dish");
      }
    }
    totalMoneyEarn += customerPays;
    randomIngredients();
    updateCounter();
    updateResultCounter();
    playerSequence.length = 0;
    console.log(computerSequence);
  }
}
