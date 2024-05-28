// timer function (to change timer duration => change value of duration variable)
let timerInSeconds = setInterval(updateTimer, 1000);

let duration = 10;

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
    clearInterval(timerInSeconds);
  }
}
