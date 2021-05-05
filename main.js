// TODO features if time:
//  - More than 2 players
//  - Player avatars - user can select img rather than using just X and O
//  - Results tracking, i.e. tournament with best of 3/5/7 etc.
//  -

// Game options - global variables
let gridSize = 3;
let round = 0;
let gameOver = false;
let gameBoard = generateGameBoard(gridSize);

let screens = ["splash", "settings", "player-select", "match-up", "game"];

// Query selectors
// Text
let message = document.querySelector("#message");

// Buttons
let splashPlayBtn = document.querySelector("#splash-play-btn");
let optionsBtn = document.querySelector("#options-btn");
let saveoptionsBtn = document.querySelector("#save-options-btn");
let rematchBtn = document.querySelector("#rematch");
let endGameBtn = document.querySelector("#end-game-btn");

// Screens
let splashScreen = document.querySelector("#splash");
let optionsScreen = document.querySelector("#options");
let playerSelectScreen = document.querySelector("#player-select");
let matchUpScreen = document.querySelector("#match-up");
let gameScreen = document.querySelector("#game");

// Change Screens
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
  goToScreen("splash");
});

rematchBtn.addEventListener("click", resetGameBoard);

// Player profile
let player1 = {
  id: 1,
  mark: "X",
  results: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
};

let player2 = {
  id: 2,
  mark: "O",
  results: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
};

let whoseTurn = player1.id;

function goToScreen(screen) {
  if (screen === "splash") {
    splashScreen.style.display = "flex";
    optionsScreen.style.display = "none";
    playerSelectScreen.style.display = "none";
    matchUpScreen.style.display = "none";
    gameScreen.style.display = "none";
  } else if (screen === "options") {
    splashScreen.style.display = "none";
    optionsScreen.style.display = "flex";
    playerSelectScreen.style.display = "none";
    matchUpScreen.style.display = "none";
    gameScreen.style.display = "none";
  } else if (screen === "player-select") {
    splashScreen.style.display = "none";
    optionsScreen.style.display = "none";
    playerSelectScreen.style.display = "flex";
    matchUpScreen.style.display = "none";
    gameScreen.style.display = "none";
  } else if (screen === "match-up") {
    splashScreen.style.display = "none";
    optionsScreen.style.display = "none";
    playerSelectScreen.style.display = "none";
    matchUpScreen.style.display = "flex";
    gameScreen.style.display = "none";
  } else if (screen === "game") {
    splashScreen.style.display = "none";
    optionsScreen.style.display = "none";
    playerSelectScreen.style.display = "none";
    matchUpScreen.style.display = "none";
    gameScreen.style.display = "block";
  }
}

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
  let gridValue = "";
  for (let i = 0; i < gridSize; i++) {
    gridValue += "200px ";
  }
  return gridValue;
}

function playGame() {
  // Start game with blank gameboard
  goToScreen("match-up");
  displayGameBoard(gameBoard);
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
      if (gameOver || boardValue != 0) {
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
  let result = checkWinner();
  if (result != null) {
    gameOver = true;
    postGameCelebration(result);
  }
}

function postGameCelebration(result) {
  message.innerText = result;
  round++;
  updateScores(result);
}

function updateScores(result) {
  if (result === player1.id) {
    player1.results.wins++;
    player2.results.losses++;
  } else if (result === player2.id) {
    player2.results.wins++;
    player1.results.losses++;
  } else {
    player1.results.ties++;
    player2.results.ties++;
  }
  //
  console.log(`Round ${round} results`);
  console.log("-----------");
  console.log(
    `Player 1: ${player1.results.wins}-${player1.results.losses}-${player1.results.ties}`
  );
  console.log(
    `Player 2: ${player2.results.wins}-${player2.results.losses}-${player2.results.ties}`
  );
}

function updateGameBoard() {
  let squares = document.querySelectorAll("#grid-container div");

  for (let i = 0; i < squares.length; i++) {
    if (gameBoard[i] === 0) {
      squares[i].innerHTML = "";
    } else if (gameBoard[i] === 1) {
      squares[i].innerHTML = `${player1.mark}`;
    } else if (gameBoard[i] === 2) {
      squares[i].innerHTML = `${player2.mark}`;
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
  whoseTurn = player1.id;
  gameOver = false;
  updateGameBoard();
}

function checkWinner() {
  if (checkMatrix("row") || checkMatrix("column") || checkMatrix("diagonal")) {
    console.log(`Player ${whoseTurn} is the winner!`);
    return whoseTurn;
  } else if (checkTie()) {
    console.log(`It's a tie!`);
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
