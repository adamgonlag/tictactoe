// TODO features if time:
//  - More than 2 players
//  - Player avatars - user can select img rather than using just X and O
//  - Results tracking, i.e. tournament with best of 3/5/7 etc.
//  -

// Game settings - global variables
let gridSize = 3;
let whoseTurn = 1;
let gameWon = false;
let gameBoard = generateGameBoard(gridSize);

// Player marks -
let player1 = "X";
let player2 = "O";

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

//Display board on the screen
function updateGameBoard() {
  // Create grid container for game squares
  const grid = document.createElement("main");
  grid.id = "grid-container";
  grid.style.gridTemplateColumns = gridTemplateString(gridSize);
  grid.style.gridTemplateRows = gridTemplateString(gridSize);
  document.body.appendChild(grid);

  // Add squares and values to the grid based on the current state of the gameboard
  for (let i = 0; i < gameBoard.length; i++) {
    const newSquare = document.createElement("div");
    newSquare.id = `${i}`;
    const squareStatus = gameBoard[i];
    if (squareStatus === 1) {
      newSquare.innerHTML = `${player1}`;
    } else if (squareStatus === 2) {
      newSquare.innerHTML = `${player2}`;
    }
    grid.appendChild(newSquare);
  }

  takeATurn();
}

function takeATurn() {
  const squares = document.querySelectorAll("#grid-container div");

  for (let i = 0; i < squares.length; i++) {
    const squareClicked = squares[i];

    squareClicked.addEventListener("click", function (e) {
      let boardIndex = parseInt(e.target.id);
      let squareValue = gameBoard[boardIndex];

      // Check if square clicked is empty, X or O
      if (squareValue === 0) {
        gameBoard[boardIndex] = whoseTurn;

        result = checkWinner();
        if (result) {
          console.log(result);
        }
        updateTurn();
        clearGameBoard();
        updateGameBoard();
      }
    });
  }
}

function clearGameBoard() {
  let ticTacToe = document.querySelector("#grid-container");
  ticTacToe.remove();
}

function updateTurn() {
  if (whoseTurn === 1) {
    whoseTurn = 2;
  } else {
    whoseTurn = 1;
  }
}

function checkWinner() {
  if (checkMatrix("row") || checkMatrix("column") || checkMatrix("diagonal")) {
    console.log("Winner!");
    return whoseTurn;
  } else if (checkTie()) {
    return "tie";
  } else {
    return false;
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

updateGameBoard();

// What to do when there's a winner (gameWon = true):
//    function endGame() {
//        - Display congrats message
//        - Ask if user want to play another game?
//        - Keep track of score
// }
