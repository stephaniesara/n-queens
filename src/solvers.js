/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// check if there's a conflict with rook or queen at curr row and col
window._hasConflict = function(board, type, row, col) {
  if (type === 'rooks') {
    return board.hasColConflictAt(col);
  } else {
    return board.hasAnyQueenConflictsOn(row, col);
  }
};

// return a solution for finding n items of type on an nxn board
window._getBoard = function(nextRow, nextCol, board, target, type) {
  var solution = 0;
  var n = board.get('n');
  for (var row = nextRow; row < n; row++) {
    for (var col = nextCol; col < n; col++) {
      board.togglePiece(row, col);
      if (!_hasConflict(board, type, row, col)) {
        if (target === n - 1) {
          return board.rows();
        } else {
          var nextSol = _getBoard(row + 1, 0, board, target + 1, type);
          solution = nextSol;
          if (solution) {
            return solution;
          }
        }
      }
      board.togglePiece(row, col);
    }
  }
  return solution;
};

// return number of solutions for finding n items of type on an nxn board
window._getCount = function(nextRow, nextCol, board, target, type) {
  var solution = 0;
  var n = board.get('n');
  for (var row = nextRow; row < n; row++) {
    for (var col = nextCol; col < n; col++) {
      board.togglePiece(row, col);
      if (!_hasConflict(board, type, row, col)) {
        if (target === n - 1) {
          board.togglePiece(row, col);
          return solution + 1;
        } else {
          var nextSol = _getCount(row + 1, 0, board, target + 1, type);
          solution += nextSol;
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
  var solution = _getBoard(0, 0, board, 0, 'rooks');
  return solution === 0 ? undefined : solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  return _getCount(0, 0, board, 0, 'rooks');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = _getBoard(0, 0, board, 0, 'queens');
  return solution === 0 ? board.rows() : solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { // There is technicall 1 solution if looking for 0 queens
    return 1;
  }
  var board = new Board({n: n});
  return _getCount(0, 0, board, 0, 'queens');
};
