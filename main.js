// PseudoCode

// Create a gameboard:
//    HTML: nil - use JS to render the gameboard.
//    JS: declare a variable 'gameBoard' to store the current state of the game:
//      - 3 arrays of 3 values, each representing a game square -> var gameBoard = [[0,0,0],[0,0,0],[0,0,0]]
//        - 0 = blank square
//        - 1 = playerOne
//        - 2 = playerTwo
//      - All squares start as blank - i.e. 0.

//      - function displayGameBoard() {
//              - loop through each array element and create a div and add some content (blank, X, or 0). Could be an image/avatar selected by user etc.
//              - add classes for style.
//            }

// Taking a Turn:
//    On click of a square:
//        function takeATurn(whoseTurn) {
//          check gameboard array:
//            if square is X or O - do nothing
//            if square is blank - change to X or O depending on whoseTurn
//                - update gameboard array with new value (0,1 or 2) dpeending on whoseTurn
//                - display new board
//                - check if winner. If no winner update whoseTurn and allow another turn.
//         }

// Check if Winner:
//    Check if player has 3 in a row - rows, columns, diagonals
  //    function checkWinner() {
  //        function checkRow() {
  //            Loop through each row array. If row1[0] = row1[1] = row1[2] WINNER!
  //            if winner, return true
  //        }

  //        function checkColumn() {
  //            Loop through each row array row 1[0] = row2[0] = row3[0] => WINNER!
  //            if winner, return true
  //        }

  //        function checkDiagonal() {
  //            Loop through each row array and it's elements:
  //              - if row1[0] = row2[1] = row3[2] => WINNER!
  //              - if row1[2] = row2[1] = row3[0] => WINNER!
  //            if winner, return true
  //        }

  //        if winner, update variable gameWon = true
  //  }

// What to do when there's a winner (gameWon = true):
//    function endGame() {
//        - Display congrats message
//        - Ask if user want to play another game?
//        - Keep track of score
// }
