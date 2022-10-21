"use strict";

/*
2. Assignment (Rock Paper Scissors - UI):
a) In our UI, the player should be able to play the game by clicking on buttons rather than
typing their answer in a prompt.
b) For now, remove the logic that plays exactly five rounds.
c) Create three buttons, one for each selection. Add an event listener to the buttons that call
your playRound function with the correct playerSelection every time a button is clicked.
(you can keep the console.logs for this step)
d) Add a div for displaying results and change all of your console.logs into DOM methods.
e) Display the running score, and announce a winner of the game once one player reaches 5
points.
*/
const chooseRock = document.querySelector(".game__choose--rock");
const chooseScissors = document.querySelector(".game__choose--scissors");
const choosePaper = document.querySelector(".game__choose--paper");

const playerContainerImg = document.querySelector(".game__player--img");
const computerContainerImg = document.querySelector(".game__computer--img");

const gameResultContainer = document.querySelector(".game__result");
const totalPlayerContainer = document.querySelector(".scores__player");
const totalComputerContainer = document.querySelector(".scores__computer");
const totalWinnerContainer = document.querySelector(".scores__total");

const btnStartAgain = document.querySelector(".btn");

const computerPlays = [
  { name: "rock", imageURL: "img/rock_img.png" },
  { name: "paper", imageURL: "img/paper_img.png" },
  { name: "scissors", imageURL: "img/scissors_img.png" },
];

let playerScore = 0;
let computerScore = 0;

//Event Listeners for options

const showPlayerImg = function (option) {
  playerContainerImg.src = "img/white_img.png";
  const changeImg = () => (playerContainerImg.src = `img/${option}_img.png`);
  setTimeout(changeImg, 300);
  play(option);
};

chooseRock.addEventListener("click", function () {
  showPlayerImg("rock");
});

chooseScissors.addEventListener("click", function () {
  showPlayerImg("scissors");
});

choosePaper.addEventListener("click", function () {
  showPlayerImg("paper");
});

//Event Listeners for button start again

btnStartAgain.addEventListener("click", function () {
  computerContainerImg.src = "img/white_img.png";
  playerContainerImg.src = "img/white_img.png";
  gameResultContainer.textContent = "Try to win!";
  totalWinnerContainer.textContent = "";
  totalPlayerContainer.textContent = "";
  totalComputerContainer.textContent = "";

  playerScore = 0;
  computerScore = 0;
});

// Computer makes a choice
function computerPlay() {
  computerContainerImg.src = "img/white_img.png";

  const randomNumber = Math.floor(Math.random() * 3);
  const { name, imageURL } = computerPlays[randomNumber];

  const changeImg = function () {
    computerContainerImg.src = imageURL;
  };
  setTimeout(changeImg, 300);

  return name;
}

//Adding scores to the winner
function playerWon() {
  playerScore++;
  gameResultContainer.textContent = "This round: You won!";
}

function computerWon() {
  computerScore++;
  gameResultContainer.textContent = "This round: You lost!";
}

// Game
function setResult(playerSelection) {
  const computerSelection = computerPlay();
  const isDraw = playerSelection === computerSelection;

  if (isDraw) {
    gameResultContainer.textContent = "This round: Draw!";
    return;
  }

  if (computerSelection === "rock") {
    playerSelection === "paper" ? playerWon() : computerWon();
  } else if (computerSelection === "paper") {
    playerSelection === "scissors" ? playerWon() : computerWon();
  } else if (computerSelection === "scissors") {
    playerSelection === "rock" ? playerWon() : computerWon();
  }
}

// Play
function play(playerSelection) {
  totalWinnerContainer.textContent = "";
  setResult(playerSelection);

  totalPlayerContainer.textContent = `Total Player Score: ${playerScore}`;
  totalComputerContainer.textContent = `Total Computer Score: ${computerScore}`;

  if (playerScore === 5 || computerScore === 5) {
    finishGame();
  }
}

// Finish the game
function finishGame() {
  const result = playerScore === 5 ? "won" : "lost";
  totalWinnerContainer.textContent = `You ${result} total Game!`;

  gameResultContainer.textContent = "Press new game or press an option";

  totalPlayerContainer.textContent = "";
  totalComputerContainer.textContent = "";
  playerScore = 0;
  computerScore = 0;
}
