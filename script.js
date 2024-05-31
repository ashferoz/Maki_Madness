// --------- element called ---------
const storeSfx = document.querySelector("#store-sfx");
const buttonSfx = document.querySelector("#button-sfx");
const bgm = document.querySelector("#bgm");
const startButton = document.querySelector(".start");
const startWindow = document.querySelector(".start-window");
const currentGoal = document.querySelector(".current-goal");
const currentDay = document.querySelector(".current-day");
const resultWindow = document.querySelector("#result-window");
const continueButton = document.querySelector("#continue");
const restartButton = document.querySelector("#restart");
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
const guideWindow = document.querySelector(".guide-window");

let computerSequence = [];
let playerSequence = [];
let playerCanInput = false;
let currentIndex = 0;
let isGuideWindowVisible = false;
guideWindow.style.visibility = "hidden";

// player earnings
let totalMoneyEarn = 0;
const refund = 15;
const customerPays = 15;

// how much player needs to earn
let day = 1;
let currentEarningsNeeded = 30;

const ingredients = ["salmon", "tuna", "wasabi", "ebi", "tamago", "ikura"];

// intro game display
currentGoal.innerText = "$" + currentEarningsNeeded + ".00";
let timerDisplay = null;
function introGameDisplay() {
  timerDisplay = setInterval(() => {
    updateTimer();
  }, 1000);
}

// click start button
startButton.addEventListener("click", function (e) {
  introGameDisplay();
  updateTimer();
  playerCanInput = true;
  storeSfx.play();
  buttonSfx.play();
  bgm.play();
  randomIngredients();
  startWindow.style.visibility = "hidden";
  currentIndex = 0;
  document.querySelectorAll(".dish-image").forEach((img) => img.remove());
  playerSequence.length = 0;
});

// next round window
// continue button
function continueButtonWorks() {
  continueButton.addEventListener("click", function (e) {
    resultWindow.style.visibility = "hidden";
    startWindow.style.visibility = "visible";
    currentGoal.innerText = "$" + currentEarningsNeeded + ".00";
    currentDay.innerText = "Day " + day;
    buttonSfx.play();
    updateDayCounter();
    updateMoneyCounter();
    duration = 30;
  });
}
// restart button
function restartButtonWorks() {
  restartButton.addEventListener("click", function (e) {
    resultWindow.style.visibility = "hidden";
    startWindow.style.visibility = "visible";
    currentGoal.innerText = "$" + currentEarningsNeeded + ".00";
    currentDay.innerText = "Day " + day;
    buttonSfx.play();
    updateDayCounter();
    updateMoneyCounter();
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
    playerWinOrLose(totalMoneyEarn, currentEarningsNeeded);
    duration = 0;
    displayResult.style.visibility = "visible";
    clearInterval(timerDisplay);
    playerCanInput = false;
    storeSfx.play();
    document.querySelectorAll(".dish-image").forEach((img) => img.remove());
  }
}

// random computer sequence generator
function randomIngredients() {
  computerSequence.length = 0;
  for (let i = 0; i < 6; i++) {
    const getRandomIngredient =
      ingredients[Math.floor(Math.random() * ingredients.length)];
    computerSequence.push(getRandomIngredient);
    const itemOrder = document.querySelector(`.comp-${i + 1}`);
    itemOrder.innerText = getRandomIngredient;
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "KeyH") {
    buttonSfx.play();
    if (isGuideWindowVisible) {
      guideWindow.style.visibility = "hidden"; 
    } else {
      guideWindow.style.visibility = "visible"; 
    }
  
    isGuideWindowVisible = !isGuideWindowVisible;
  }
  if (playerCanInput === true) {
    handleUserInput(e);
  }
});

function handleUserInput(e) {
  if (e.code === "KeyA") {
    playerSequence.push("tuna");
    buttonSfx.play();
    imageOfInput("assets/tuna.svg", currentIndex++);
  } else if (e.code === "KeyW") {
    buttonSfx.play();

    playerSequence.push("salmon");
    imageOfInput("assets/salmon.svg", currentIndex++);
  } else if (e.code === "KeyD") {
    buttonSfx.play();
    playerSequence.push("wasabi");
    imageOfInput("assets/wasabi.svg", currentIndex++);
  } else if (e.code === "KeyJ") {
    buttonSfx.play();
    playerSequence.push("tamago");
    imageOfInput("assets/tamago.svg", currentIndex++);
  } else if (e.code === "KeyI") {
    buttonSfx.play();
    playerSequence.push("ikura");
    imageOfInput("assets/ikura.svg", currentIndex++);
  } else if (e.code === "KeyL") {
    buttonSfx.play();
    playerSequence.push("ebi");
    imageOfInput("assets/ebi.svg", currentIndex++);
  }
  if (e.code === "Backspace") {
    currentIndex = 0;
    mistakeSfx.play();
    playerSequence.length = 0;
    // Remove images
    document.querySelectorAll(".dish-image").forEach((img) => img.remove());
    if (duration <= 5) {
      duration = 0;
    } else {
      duration -= 5;
    }
  } else if (e.code === "Enter") {
    submitDish(playerSequence, computerSequence);
    currentIndex = 0;
    // Remove images
    document.querySelectorAll(".dish-image").forEach((img) => img.remove());
  }
  console.log(playerSequence);
}

// add image based on player inputs
function imageOfInput(playerDish, index) {
  const dishSelected = document.querySelector(`.item-${index + 1}`);
  // Remove previous image if exists
  dishSelected.querySelectorAll("img").forEach((img) => img.remove());
  const dishImage = document.createElement("img");
  dishImage.src = playerDish;
  // Add a class to identify these images for removal
  dishImage.classList.add("dish-image");
  dishSelected.append(dishImage);
}

// check to see if player input is correct or not
function submitDish(playerDish, computerDish) {
  if (playerDish.length !== computerDish.length) {
    totalMoneyEarn -= refund;
    updateMoneyCounter();
    badSfx.play();
    playerSequence.length = 0;
    return;
  } else {
    for (let i = 0; i < playerDish.length; i++) {
      if (playerDish[i] !== computerDish[i]) {
        totalMoneyEarn -= refund;
        updateMoneyCounter();
        badSfx.play();
        playerSequence.length = 0;
        return;
      }
    }
    cashSfx.play();
    goodSfx.play();
    totalMoneyEarn += customerPays;
    randomIngredients();
    updateMoneyCounter();
    playerSequence.length = 0;
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
    currentEarningsNeeded += 15;
    day++;
    totalMoneyEarn = 0;
    continueButtonWorks();
    continueButton.style.background = "#efd34a";
    continueButton.addEventListener("mouseover", () => {
      // Change the button's background color
      continueButton.style.fontSize = "33px";
      continueButton.style.background = "#ffed91";
    });
    continueButton.addEventListener("mouseout", () => {
      continueButton.style.fontSize = "30px";
      continueButton.style.background = "#efd34a";
    });
  } else if (totalEarning < totalNeeded) {
    winLoseOutput.innerText = "Uh-oh! Game over. Time to close shop...";
    winLoseOutput.style.color = "#e33030";
    targetResultCounter.style.color = "#e33030";
    totalMoneyEarn = 0;
    continueButton.style.background = "#373737";
    continueButton.addEventListener("mouseover", () => {
      // Change the button's background color
      continueButton.style.fontSize = "30px";
    });
    continueButton.addEventListener("mouseout", () => {
      continueButton.style.fontSize = "30px";
    });
    restartButtonWorks();
  }
}
