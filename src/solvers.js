/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window._getRooks = function(nextRow, nextCol, board, rooks, getFirst) {
  var solution = 0;
  var n = board.get('n');
  for (var row = nextRow; row < n; row++) {
    for (var col = nextCol; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasColConflictAt(col)) {
        if (rooks === n - 1) {
          if (getFirst) {
            return board.rows();
          } else {
            board.togglePiece(row, col);
            return solution + 1;
            // solution++;
          }
        } else {
          var nextSol = _getRooks(row + 1, 0, board, rooks + 1, getFirst);
          if (getFirst) {
            solution = nextSol;
            if (solution) {
              return solution;
            }
          } else {
            solution += nextSol;
          }
        }
      }
      board.togglePiece(row, col);
    }
  }
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = _getRooks(0, 0, board, 0, true);
  return solution === 0 ? undefined : solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  return _getRooks(0, 0, board, 0, false);
};


window._getQueens = function(nextRow, nextCol, board, queens, getFirst) {
  var solution = 0;
  var n = board.get('n');
  for (var row = nextRow; row < n; row++) {
    for (var col = nextCol; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        if (queens === n - 1) {
          if (getFirst) {
            return board.rows();
          } else {
            board.togglePiece(row, col);
            return solution + 1;
            // solution++;
          }
        } else {
          var nextSol = _getQueens(row + 1, 0, board, queens + 1, getFirst);
          if (getFirst) {
            solution = nextSol;
            if (solution) {
              return solution;
            }
          } else {
            solution += nextSol;
          }
        }
      }
      board.togglePiece(row, col);
    }
  }
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = _getQueens(0, 0, board, 0, true);
  return solution === 0 ? board.rows() : solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { // There is technicall 1 solution if looking for 0 queens
    return 1;
  }
  var board = new Board({n: n});
  return _getQueens(0, 0, board, 0, false);
};
