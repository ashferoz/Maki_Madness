// --------- element selected ---------
const storeSfx = document.querySelector("#store-sfx");
const buttonSfx = document.querySelector("#button-sfx");
const bgm = document.querySelector("#bgm");
const startButton = document.querySelector(".start");
const startWindow = document.querySelector(".start-window");
const currentGoal = document.querySelector(".current-goal");
const currentDay = document.querySelector(".current-day");
const resultWindow = document.querySelector("#result-window");
const continueButton = document.querySelector("#continue");
const timerElement = document.querySelector("#timer");
const displayResult = document.querySelector("#result-window");
const goodSfx = document.querySelector("#good-sfx");
const badSfx = document.querySelector("#bad-sfx");
const cashSfx = document.querySelector("#cash-sfx");
const mistakeSfx = document.querySelector("#mistake-sfx");
const targetMoneyCounter = document.querySelector("#ingame-earning");
const targetDayCounter = document.querySelector("#day");
const targetResultCounter = document.querySelector(".total-earnings");
const winLoseOutput = document.querySelector(".outcome");

const ingredients = ["salmon", "tuna", "wasabi", "ebi", "tamago", "ikura"];

let computerSequence = [];
let playerSequence = [];
let playerCanInput = false;

// intro game display
let timerDisplay = null;
function introGameDisplay() {
  timerDisplay = setInterval(() => {
    updateTimer();
    console.log("interval running");
  }, 1000);
  console.log("time starts");
}

// click start button
startButton.addEventListener("click", function (e) {
  introGameDisplay();
  updateTimer();
  playerCanInput = true;
  storeSfx.play();
  bgm.play();
  startWindow.style.visibility = "hidden";
});

// next round window
function continueButtonWorks() {
  continueButton.addEventListener("click", function (e) {
    resultWindow.style.visibility = "hidden";
    startWindow.style.visibility = "visible";
    currentGoal.innerText = "$" + currentEarningsNeeded + ".00";
    currentDay.innerText = "Day " + day;
    updateDayCounter();
    duration = 30;
  });
}

// display timer and result
displayResult.style.visibility = "hidden";

// timer function (to change timer duration => change value of duration variable)
let duration = 30;
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
    playerCanInput = false;
    storeSfx.play();
    playerWinOrLose(totalMoneyEarn, currentEarningsNeeded);
    console.log("times up");
  }
}

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

document.addEventListener("keydown", function (e) {
  if (playerCanInput === true) {
    handleUserInput(e);
  }
});

function handleUserInput(e) {
  if (e.code === "KeyA") {
    playerSequence.push("tuna");
    buttonSfx.play();
  } else if (e.code === "KeyW") {
    buttonSfx.play();
    playerSequence.push("salmon");
  } else if (e.code === "KeyD") {
    buttonSfx.play();
    playerSequence.push("wasabi");
  } else if (e.code === "KeyJ") {
    buttonSfx.play();
    playerSequence.push("tamago");
  } else if (e.code === "KeyI") {
    buttonSfx.play();
    playerSequence.push("ikura");
  } else if (e.code === "KeyL") {
    buttonSfx.play();
    playerSequence.push("ebi");
  } else if (e.code === "Backspace") {
    mistakeSfx.play();
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
}


// player earnings
let totalMoneyEarn = 0;
const refund = 15;
const customerPays = 15;

// how much player needs to earn
let day = 1;
let currentEarningsNeeded = 15;

// check to see if player input is correct or not
function submitDish(playerDish, computerDish) {
  if (playerDish.length !== computerDish.length) {
    totalMoneyEarn -= refund;
    updateMoneyCounter();
    badSfx.play();
    return console.log("You made the wrong dish");
  } else {
    for (let i = 0; i < playerDish.length; i++) {
      if (playerDish[i] !== computerDish[i]) {
        totalMoneyEarn -= refund;
        updateMoneyCounter();
        badSfx.play();
        return console.log("You made the wrong dish");
      }
    }
    cashSfx.play();
    goodSfx.play();
    totalMoneyEarn += customerPays;
    randomIngredients();
    updateMoneyCounter();
    playerSequence.length = 0;
    console.log(computerSequence);
  }
}

// update counters
function updateMoneyCounter() {
  // counter during game
  targetMoneyCounter.innerText = "$" + totalMoneyEarn + ".00";
  // counter for result
  targetResultCounter.innerText = "$" + totalMoneyEarn + ".00";
}

function updateDayCounter() {
  // counter during game
  targetDayCounter.innerText = "Day: " + day;
  // counter for result
  targetResultCounter.innerText = "$" + totalMoneyEarn;
}

// check to see if player win or lose
function playerWinOrLose(totalEarning, totalNeeded) {
  if (totalEarning >= totalNeeded) {
    winLoseOutput.innerText = "You managed well! You can open again tomorrow.";
    winLoseOutput.style.color = "#51a65e";
    targetResultCounter.style.color = "#51a65e";
    currentEarningsNeeded += 60;
    day++;
    continueButtonWorks();
  }
}
