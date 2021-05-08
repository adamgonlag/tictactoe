// TODO features if time:
//  - More than 2 players
//  - Player avatars - user can select img rather than using just X and O
//  - Results tracking, i.e. tournament with best of 3/5/7 etc.
//  -

// Game options - global variables
let gridSize = 3;
let numberOfGames = 3;
let timeLimit = false;
let musicPlaying = true;
let round = 1;
let roundOver = false;
let gameOver = false;
let player1Selected = false;
let player2Selected = false;
let gameBoard = generateGameBoard(gridSize);

let screens = ["splash", "settings", "player-select", "match-up", "game"];

// Player profiles
let player1 = {
  id: 1,
  mark: "X",
  avatar: "",
  results: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
};

let player2 = {
  id: 2,
  mark: "O",
  avatar: "",
  results: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
};

let whoseTurn = player1.id;

let characterPortraits = [
  {
    name: "ryu",
    image: "./assets/streetfighter-ryu.png",
    imageReverse: "./assets/streetfighter-ryu-rev.png",
    matchUp: "./assets/streetfighter-ryu-vs.png",
    matchUpReverse: "./assets/streetfighter-ryu-rev-vs.png",
    small: "./assets/streetfighter-ryu-small.png",
  },
  {
    name: "ehonda",
    image: "./assets/streetfighter-ehonda.png",
    imageReverse: "./assets/streetfighter-ehonda-rev.png",
    matchUp: "./assets/streetfighter-ehonda-vs.png",
    matchUpReverse: "./assets/streetfighter-ehonda-rev-vs.png",
    small: "./assets/streetfighter-ehonda-small.png",
  },
  {
    name: "blanka",
    image: "./assets/streetfighter-blanka.png",
    imageReverse: "./assets/streetfighter-blanka-rev.png",
    matchUp: "./assets/streetfighter-blanka-vs.png",
    matchUpReverse: "./assets/streetfighter-blanka-rev-vs.png",
    small: "./assets/streetfighter-blanka-small.png",
  },
  {
    name: "guile",
    image: "./assets/streetfighter-guile.png",
    imageReverse: "./assets/streetfighter-guile-rev.png",
    matchUp: "./assets/streetfighter-guile-vs.png",
    matchUpReverse: "./assets/streetfighter-guile-rev-vs.png",
    small: "./assets/streetfighter-guile-small.png",
  },
  {
    name: "ken",
    image: "./assets/streetfighter-ken.png",
    imageReverse: "./assets/streetfighter-ken-rev.png",
    matchUp: "./assets/streetfighter-ken-vs.png",
    matchUpReverse: "./assets/streetfighter-ken-rev-vs.png",
    small: "./assets/streetfighter-ken-small.png",
  },
  {
    name: "chunli",
    image: "./assets/streetfighter-chunli.png",
    imageReverse: "./assets/streetfighter-chunli-rev.png",
    matchUp: "./assets/streetfighter-chunli-vs.png",
    matchUpReverse: "./assets/streetfighter-chunli-rev-vs.png",
    small: "./assets/streetfighter-chunli-small.png",
  },
  {
    name: "zangief",
    image: "./assets/streetfighter-zangief.png",
    imageReverse: "./assets/streetfighter-zangief-rev.png",
    matchUp: "./assets/streetfighter-zangief-vs.png",
    matchUpReverse: "./assets/streetfighter-zangief-rev-vs.png",
    small: "./assets/streetfighter-zangief-small.png",
  },
  {
    name: "dhalsim",
    image: "./assets/streetfighter-dhalsim.png",
    imageReverse: "./assets/streetfighter-dhalsim-rev.png",
    matchUp: "./assets/streetfighter-dhalsim-vs.png",
    matchUpReverse: "./assets/streetfighter-dhalsim-rev-vs.png",
    small: "./assets/streetfighter-dhalsim-small.png",
  },
];

// Text Elements
let message = document.querySelector("#message");

// Audio
const audio = document.querySelector("audio");

// Buttons
let splashPlayBtn = document.querySelector("#splash-play-btn");
let optionsBtn = document.querySelector("#options-btn");
let saveoptionsBtn = document.querySelector("#save-options-btn");
let endGameBtn = document.querySelector("#end-game-btn");

// Game Screen
let player1Game = document.querySelector("#p1-game-image");
let player2Game = document.querySelector("#p2-game-image");
let player1Name = document.querySelector("#p1-game-name");
let player2Name = document.querySelector("#p2-game-name");

// Screens and Navigation
let splashScreen = document.querySelector("#splash");
let optionsScreen = document.querySelector("#options");
let playerSelectScreen = document.querySelector("#player-select");
let matchUpScreen = document.querySelector("#match-up");
let gameScreen = document.querySelector("#game");
let mainElement = document.querySelector("main");
let player1Score = document.querySelector("#p1-score");
let player2Score = document.querySelector("#p2-score");
let gameMessageElement = document.querySelector("#game-message");

splashPlayBtn.addEventListener("click", function () {
  goToScreen("player-select");
});
optionsBtn.addEventListener("click", function () {
  goToScreen("options");
});
saveoptionsBtn.addEventListener("click", function () {
  goToScreen("splash");
});
endGameBtn.addEventListener("click", function () {
  // Need to reset all player selections, gameboarstatus
  goToScreen("splash");
  endGame();
});

function endGame() {
  audio.src = "./assets/menu.mp3";
  mainElement.style.background = "#17087c";
  player1Selected = false;
  player2Selected = false;
  player1Portrait.src = "";
  player2Portrait.src = "";
  player1MatchUp.src = "";
  player2MatchUp.src = "";
  player1.results.wins = 0;
  player1.results.ties = 0;
  player1.results.losses = 0;
  player2.results.wins = 0;
  player2.results.ties = 0;
  player2.results.losses = 0;
  player2Score.innerHTML = "<h2>0</h2>";
  player1Score.innerHTML = "<h2>0</h2>";
  whoseTurn = player1.id;
  round = 1;
  gameOver = false;
  resetGameBoard();
}

function goToScreen(screen) {
  // Reset all screens
  splashScreen.style.display = "none";
  optionsScreen.style.display = "none";
  playerSelectScreen.style.display = "none";
  matchUpScreen.style.display = "none";
  gameScreen.style.display = "none";

  if (screen === "splash") {
    splashScreen.style.display = "flex";
  } else if (screen === "options") {
    optionsScreen.style.display = "flex";
  } else if (screen === "player-select") {
    audio.src = "./assets/playerselect.mp3";
    playerSelectScreen.style.display = "flex";
  } else if (screen === "match-up") {
    audio.src = "./assets/startbattle.mp3";
    matchUpScreen.style.display = "flex";
  } else if (screen === "game") {
    audio.src = "./assets/ryutheme.mp3";
    gameScreen.style.display = "flex";
    mainElement.style.background = "url(./assets/game-background.jpg)";
    gameMessage(`Round ${round}`);
    setTimeout(function () {
      gameMessage("FIGHT!!");
      setTimeout(function () {
        resetGameBoard();
      }, 1500);
    }, 1500);
  }
}

// Options Screen
let boardSizeOptions = document.querySelectorAll(".board-size");
let numGames = document.querySelectorAll(".num-games");
let timeLimitOptions = document.querySelectorAll(".time-option");
let musicOptions = document.querySelectorAll(".music-option");

let allOptions = [boardSizeOptions, numGames, timeLimitOptions, musicOptions];

// Set options event listeners
for (let i = 0; i < allOptions.length; i++) {
  selectOption(allOptions[i]);
}

function selectOption(optionsList) {
  for (let i = 0; i < optionsList.length; i++) {
    let currentOption = optionsList[i];
    currentOption.addEventListener("click", function (e) {
      let target = e.target;
      let classList = optionsList[i].classList;
      // Update each global option variable
      if (classList.contains("board-size")) {
        var newSize = parseInt(target.innerText);
        gridSize = newSize;
        //display the new board
        const grid = document.querySelector("#grid-container");
        grid.remove();
        console.log("removed");
        gameBoard = generateGameBoard(gridSize);

        displayGameBoard();
      } else if (classList.contains("num-games")) {
        var newNumGames = parseInt(target.innerText);
        numberOfGames = newNumGames;
      } else if (classList.contains("time-options")) {
        if (target.innerText === "YES") {
          timeLimit = true;
        } else {
          timeLimit = false;
        }
      } else if (classList.contains("music-option")) {
        console.log(target);
        if (target.innerText === "YES") {
          musicPlaying = true;
        } else {
          musicPlaying = false;
        }
        console.log(musicPlaying);
        musicToggle();
      }

      // Update style of selected/deselected
      target.classList.add("option-selected");
      deselectOptions(currentOption, optionsList);
    });
  }
}

function deselectOptions(currentOption, optionsList) {
  for (let i = 0; i < optionsList.length; i++) {
    if (
      optionsList[i] != currentOption &&
      optionsList[i].classList.contains("option-selected")
    ) {
      optionsList[i].classList.remove("option-selected");
    }
  }
}

function musicToggle() {
  if (musicPlaying == false) {
    audio.pause();
    // audio.currentTime = 0;
  } else {
    audio.play();
  }
}

// Player Selection
let playerSelect = document.querySelectorAll(".player-grid img");
let player1Portrait = document.querySelector("#player1");
let player2Portrait = document.querySelector("#player2");
let player1MatchUp = document.querySelector("#match-up1");
let player2MatchUp = document.querySelector("#match-up2");

for (let i = 0; i < playerSelect.length; i++) {
  var currentPlayer = playerSelect[i];

  currentPlayer.addEventListener("mouseover", function (e) {
    let target = e.target;

    for (let i = 0; i < characterPortraits.length; i++) {
      // If player 1 has been selected, hovering shows player 2's character
      if (player1Selected === false) {
        if (target.id === characterPortraits[i].name) {
          player1.avatar = characterPortraits[i].name;
          player1Portrait.src = characterPortraits[i].image;
          player1MatchUp.src = characterPortraits[i].matchUp;
          player1Game.src = characterPortraits[i].small;
          player1Name.innerHTML = `<h2>${player1.avatar.toUpperCase()}</h2>`;
        }
      } else if (player2Selected === false) {
        if (target.id === characterPortraits[i].name) {
          player2.avatar = characterPortraits[i].name;
          player2Portrait.src = characterPortraits[i].imageReverse;
          player2MatchUp.src = characterPortraits[i].matchUpReverse;
          player2Game.src = characterPortraits[i].small;
          player2Name.innerHTML = `<h2>${player2.avatar.toUpperCase()}</h2>`;
        }
      }
    }
  });

  currentPlayer.addEventListener("click", function (e) {
    let target = e.target;

    if (player1Selected === false) {
      player1Selected = true;
      player1.avatar = target.id;
    } else if (player2Selected === false) {
      player2Selected = true;
      player2.avatar = target.id;

      // Both players selected, move to next screen
      goToScreen("match-up");

      // Wait for match up screen music to play out, then move to the gamescreen
      setTimeout(function () {
        goToScreen("game");
      }, 3500);
    }
  });
}

////// TIC TAC TOE GAME LOGIC

// Values in gameBoard represent a player's action
function generateGameBoard(gridSize) {
  let gameBoard = [];
  const totalSquares = gridSize * gridSize;
  for (let i = 0; i < totalSquares; i++) {
    gameBoard.push(0);
  }
  return gameBoard;
}

// Build grid based on the specified grid size
function gridTemplateString(gridSize) {
  let totalWidth = 400;
  let squareSize = totalWidth / gridSize;
  let gridValue = "";
  for (let i = 0; i < gridSize; i++) {
    gridValue += `${squareSize}px `;
  }
  return gridValue;
}

function playGame() {
  // Start game with blank gameboard
  goToScreen("splash");
  displayGameBoard();
}

function displayGameBoard() {
  // Add main grid container
  const container = document.querySelector("#gameboard");
  const grid = document.createElement("section");
  grid.id = "grid-container";
  grid.style.gridTemplateColumns = gridTemplateString(gridSize);
  grid.style.gridTemplateRows = gridTemplateString(gridSize);
  container.appendChild(grid);

  // Add squares to the grid based on the current state of the gameboard
  for (let i = 0; i < gameBoard.length; i++) {
    const newSquare = document.createElement("div");
    newSquare.id = `${i}`;
    grid.appendChild(newSquare);
  }

  // Add event listeners to each square
  const squares = document.querySelectorAll("#grid-container div");

  for (let i = 0; i < squares.length; i++) {
    const squareClicked = squares[i];

    squareClicked.addEventListener("click", function (e) {
      // Get square that was clicked
      let boardIndex = parseInt(e.target.id);

      let boardValue = gameBoard[boardIndex];

      // Check if square is empty and process the turn
      if (roundOver || boardValue != 0) {
        return;
      } else {
        takeATurn(boardIndex);
        updateWhoseTurn();
        updateGameBoard();
      }
    });
  }
}

function takeATurn(boardIndex) {
  // Update gameboard based on whose turn it is
  gameBoard[boardIndex] = whoseTurn;

  // Check if winner (1, 2, 'tie' or null)
  let result = checkRoundWinner();
  if (result != null) {
    roundOver = true;
    postRound(result);
  }
}

function postRound(result) {
  round++;
  updateScores(result);
  updateGameBoard();

  let message;
  let winner;
  if (result === player1.id) {
    winner = player1;
    message = `${winner.avatar.toUpperCase()} WINS!`;
  } else if (result === player2.id) {
    winner = player2;
    message = `${winner.avatar.toUpperCase()} WINS!`;
  } else {
    message = "TIE!!";
  }

  gameMessage(message);

  // Check if game over

  console.log(result);
  if (result != "tie") {
    if (numberOfGames === 7) {
      if (winner.results.wins === 5) {
        gameOver = true;
      }
    } else if (numberOfGames === 5) {
      if (winner.results.wins === 3) {
        gameOver = true;
      }
    } else if (numberOfGames === 3) {
      if (winner.results.wins === 2) {
        gameOver = true;
      }
    }
  }

  if (gameOver) {
    postGame(winner);
    return;
  }

  setTimeout(function () {
    gameMessage(`Round ${round}`);
    setTimeout(function () {
      gameMessage("FIGHT!!");
      setTimeout(function () {
        resetGameBoard();
      }, 1500);
    }, 1500);
  }, 1500);
}

function postGame(winner) {
  gameMessage(`${winner.avatar.toUpperCase()} WINS!!`);
  setTimeout(function () {
    gameMessage("GAME OVER");
    setTimeout(function () {
      gameMessageElement.style.display = "flex";
      gameMessageElement.innerHTML = `<h1>PLAY AGAIN?</h1>`;
      gameMessageElement.style.cursor = "pointer";
      gameMessageElement.addEventListener("click", function () {
        goToScreen("splash");
        endGame();
        gameMessageElement.style.display = "none";
      });
    }, 1500);
  }, 1500);
}

function gameMessage(message) {
  gameMessageElement.style.display = "flex";
  gameMessageElement.innerHTML = `<h1>${message}</h1>`;
  setTimeout(function () {
    gameMessageElement.style.display = "none";
  }, 1500);
}

function updateScores(result) {
  if (result === player1.id) {
    player1.results.wins++;
    let p1Score = player1.results.wins;
    player1Score.innerHTML = `<h2>${p1Score}</h2>`;
    player2.results.losses++;
  } else if (result === player2.id) {
    player2.results.wins++;
    let p2Score = player2.results.wins;
    player2Score.innerHTML = `<h2>${p2Score}</h2>`;

    player1.results.losses++;
  } else {
    player1.results.ties++;
    player2.results.ties++;
  }
}

function updateGameBoard() {
  let squares = document.querySelectorAll("#grid-container div");

  for (let i = 0; i < squares.length; i++) {
    if (gameBoard[i] === 0) {
      squares[i].innerHTML = "";
    } else if (gameBoard[i] === 1) {
      squares[
        i
      ].innerHTML = `<img src="./assets/streetfighter-${player1.avatar}-small.png" alt="">`;
    } else if (gameBoard[i] === 2) {
      squares[
        i
      ].innerHTML = `<img src="./assets/streetfighter-${player2.avatar}-small.png" alt="">`;
    }
  }
}

function updateWhoseTurn() {
  if (whoseTurn === player1.id) {
    whoseTurn = player2.id;
  } else {
    whoseTurn = player1.id;
  }
}

function resetGameBoard() {
  gameBoard = generateGameBoard(gridSize);
  roundOver = false;
  updateGameBoard();
}

function checkRoundWinner() {
  if (checkMatrix("row") || checkMatrix("column") || checkMatrix("diagonal")) {
    return whoseTurn;
  } else if (checkTie()) {
    return "tie";
  } else {
    return null;
  }
}

function checkMatrix(matrix) {
  let checkMatrix;
  if (matrix === "row") {
    checkMatrix = rowMatrix();
  } else if (matrix === "column") {
    checkMatrix = columnMatrix();
  } else if (matrix === "diagonal") {
    checkMatrix = diagonalMatrix();
  }

  // Check if values in each matrix array are equal
  for (let i = 0; i < checkMatrix.length; i++) {
    let winner = checkMatrix[i].every((value) => {
      if (value != 0 && value === checkMatrix[i][0]) {
        return true;
      }
    });

    if (winner) {
      return true;
    }
  }
}

function rowMatrix() {
  let rows = [];
  for (let i = 0; i < gameBoard.length; i += gridSize) {
    rows.push(gameBoard.slice(i, i + gridSize));
  }
  return rows;
}

function columnMatrix() {
  let columnMatrix = [];

  for (let i = 0; i < gridSize; i++) {
    let column = [];
    for (let j = 0; j < gameBoard.length; j += gridSize) {
      column.push(gameBoard[i + j]);
    }
    columnMatrix.push(column);
  }
  return columnMatrix;
}

function diagonalMatrix() {
  // Only 2 diagonals
  let diagonalMatrix = [];

  let diagonal1 = [];
  for (let i = 0; i < gameBoard.length; i += gridSize + 1) {
    diagonal1.push(gameBoard[i]);
  }

  let diagonal2 = [];
  for (
    let i = gridSize - 1;
    i <= gameBoard.length - gridSize;
    i += gridSize - 1
  ) {
    diagonal2.push(gameBoard[i]);
  }

  diagonalMatrix.push(diagonal1, diagonal2);

  return diagonalMatrix;
}

function checkTie() {
  if (!gameBoard.includes(0)) {
    return true;
  } else {
    return false;
  }
}

// Start game

playGame();
