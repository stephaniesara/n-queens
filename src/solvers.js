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
    //return board.hasColConflictAt(col);
    return board.colConflict[col];
  } else {
    if (board.colConflict[col]) {
      return true;
    }
    var majorKey = board._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
    if (board.majorConflict[majorKey]) {
      return true;
    }
    var minorKey = board._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
    if (board.minorConflict[minorKey]) {
      return true;
    }
    return false;
    // return board.hasColConflictAt(col) ||
    //     board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(row, col)) ||
    //     board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(row, col));
    // return board.hasAnyQueenConflictsOn(row, col);
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
        board.colConflict[col] = 1;
        if (type === 'queens') {
          var majorKey = board._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
          var minorKey = board._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
          board.majorConflict[majorKey] = 1;
          board.minorConflict[minorKey] = 1;
        }
        if (target === n - 1) {
          return board.rows();
        } else {
          var nextSol = _getBoard(row + 1, 0, board, target + 1, type);
          solution = nextSol;
          if (solution) {
            return solution;
          }
        }
        board.colConflict[col] = 0;
        if (type === 'queens') {
          board.majorConflict[majorKey] = 0;
          board.minorConflict[minorKey] = 0;
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
        board.colConflict[col] = 1;
        if (type === 'queens') {
          var majorKey = board._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
          var minorKey = board._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
          board.majorConflict[majorKey] = 1;
          board.minorConflict[minorKey] = 1;
        }
        if (target === n - 1) {
          solution++;
        } else {
          var nextSol = _getCount(row + 1, 0, board, target + 1, type);
          solution += nextSol;
        }
        board.colConflict[col] = 0;
        if (type === 'queens') {
          board.majorConflict[majorKey] = 0;
          board.minorConflict[minorKey] = 0;
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
  board.colConflict = (new Array(n)).fill(0);
  var solution = _getBoard(0, 0, board, 0, 'rooks');
  return solution === 0 ? undefined : solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  board.colConflict = (new Array(n)).fill(0);
  return _getCount(0, 0, board, 0, 'rooks');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  if (n === 1) {
    board.togglePiece(0, 0);
    return board.rows();
  } else if (n === 0) {
    return board.rows();
  }
  board.colConflict = (new Array(n)).fill(0);
  board.majorConflict = {};
  for (var i = -n + 1; i < n; i++) {
    board.majorConflict[i] = 0;
  }
  board.minorConflict = {};
  for (var i = 0; i < 2 * n; i++) {
    board.minorConflict[i] = 0;
  }
  //board.majorConflict = (new Array(2 * n - 3)).fill(0);
  //board.minorConflict = (new Array(2 * n - 3)).fill(0);
  var solution = _getBoard(0, 0, board, 0, 'queens');
  return solution === 0 ? board.rows() : solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  if (n === 0) { // There is technically 1 solution if looking for 0 queens
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }
  board.colConflict = (new Array(n)).fill(0);
  board.majorConflict = {};
  for (var i = -n + 1; i < n; i++) {
    board.majorConflict[i] = 0;
  }
  board.minorConflict = {};
  for (var i = 0; i < 2 * n; i++) {
    board.minorConflict[i] = 0;
  }
  return _getCount(0, 0, board, 0, 'queens');
};
