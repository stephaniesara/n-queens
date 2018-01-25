/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window._findRooksSolution = function(row, col, board, rooks) {
  var n = board.get('n');
  for (var i = row; i < n; i++) {
    for (var j = col; j < n; j++) {
      board.togglePiece(i, j);
      if (!board.hasColConflictAt(j)) {
        rooks++;
        if (rooks === n) {
          return board.rows();
        } else {
          var solution = _findRooksSolution(row + 1, 0, board, rooks);
          if (solution) {
            return solution;
          }
        }
        rooks--;
      }
      board.togglePiece(i, j);
    }
  }
  //return undefined;
};


window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  return _findRooksSolution(0, 0, board, 0);



  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};


window._countRooksSolution = function(row, col, board, rooks, count) {
  // debugger;
  var n = board.get('n');
  for (var i = row; i < n; i++) {
    for (var j = col; j < n; j++) {
      board.togglePiece(i, j);
      if (!board.hasColConflictAt(j)) {
        if (rooks === n - 1) {
          board.togglePiece(i, j);
          return count + 1;
        } else {
          count = _countRooksSolution(i + 1, 0, board, rooks + 1, count);
        }
      }
      board.togglePiece(i, j);
    }
  }
  return count;
  // debugger;
  // var n = board.get('n');
  // for (var i = row; i < n; i++) {
  //   for (var j = col; j < n; j++) {
  //     board.togglePiece(i, j);
  //     if (!board.hasColConflictAt(j)) {
  //       rooks++;
  //       if (rooks === n) {
  //         // return board.rows();
  //         count++;
  //       } else {
  //         count = _countRooksSolution(row + 1, 0, board, rooks, count);
  //       }
  //     }
  //     board.togglePiece(i, j);
  //   }
  // }
  // return count;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  return _countRooksSolution(0, 0, board, 0, 0); // should be integer
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
