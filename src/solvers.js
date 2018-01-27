/*           _
___  ___ | |_   _____ _ __ ___
/ __|/ _ \| \ \ / / _ \ '__/ __|
\__ \ (_) | |\ V /  __/ |  \__ \
|___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// return a solution for finding n items of type on an nxn board
window._getBoard = function(row, board, target) {
  var solution = 0;
  var n = board.get('n');
  for (var col = 0; col < n; col++) {
    board.togglePiece(row, col);
    var majorKey = col - row;
    var minorKey = col + row;
    if (!(board._hasConflict(row, col, majorKey, minorKey))) {
      (board.get('colConflict'))[col] = 1;
      if (board.type === 'queens') {
        board._toggleMajorMinor(majorKey, minorKey);
      }
      if (target === n - 1) {
        return board.rows();
      } else {
        var nextSol = _getBoard(row + 1, board, target + 1);
        solution = nextSol;
        if (solution) {
          return solution;
        }
      }
      (board.get('colConflict'))[col] = 0;
      if (board.type === 'queens') {
        board._toggleMajorMinor(majorKey, minorKey);
      }
    }
    board.togglePiece(row, col);

  }
  return solution;
};

// return number of solutions for finding n items of type on an nxn board
window._getCount = function(row, board, target) {
  var solution = 0;
  var n = board.get('n');
  for (var col = 0; col < n; col++) {
    board.togglePiece(row, col);
    var majorKey = col - row;
    var minorKey = col + row;
    if (!(board._hasConflict(row, col, majorKey, minorKey))) {
      (board.get('colConflict'))[col] = 1;
      if (board.type === 'queens') {
        board._toggleMajorMinor(majorKey, minorKey);
      }
      if (target === n - 1) {
        solution++;
      } else {
        var nextSol = _getCount(row + 1, board, target + 1);
        solution += nextSol;
      }
      (board.get('colConflict'))[col] = 0;
      if (board.type === 'queens') {
        board._toggleMajorMinor(majorKey, minorKey);
      }
    }
    board.togglePiece(row, col);
  }
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  board.type = 'rooks';
  var solution = _getBoard(0, board, 0, 'rooks');
  return solution === 0 ? undefined : solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  board.type = 'rooks';
  return _getCount(0, board, 0, 'rooks');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  board.type = 'queens';
  if (n === 1) {
    board.togglePiece(0, 0);
    return board.rows();
  } else if (n === 0) {
    return board.rows();
  }
  var solution = _getBoard(0, board, 0, 'queens');
  return solution === 0 ? board.rows() : solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  board.type = 'queens';
  if (n === 0) { // There is technically 1 solution if looking for 0 queens
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }
  return _getCount(0, board, 0, 'queens');
};
