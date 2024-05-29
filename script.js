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

// timer function (to change timer duration => change value of duration variable)
let timerDisplay = setInterval(updateTimer, 1000);
console.log("time starts");

let duration = 2 * 60;

const timerElement = document.querySelector("#timer");

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
      playerSequence.pop();
    } else if (e.code === "Enter") {
      submitDish(playerSequence, computerSequence);
    } else {
      return;
    }

    console.log(playerSequence);
  },
  true
);

// check to see if player input is correct or not
let totalMoneyEarn = 0;

function submitDish(playerDish, computerDish) {
  if (playerDish.length !== computerDish.length) {
    return console.log("You made the wrong dish");
  } else {
    for (let i = 0; i < playerDish.length; i++) {
      if (playerDish[i] !== computerDish[i]) {
        return console.log("You made the wrong dish");
      }
    }
    totalMoneyEarn += 15;
    randomIngredients();
    playerSequence.length = 0;
    console.log("you serve: " + playerSequence);
    console.log("your customer wanted: " + computerSequence);
    console.log(totalMoneyEarn);
    console.log(computerSequence);
  }
}
