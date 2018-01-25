var suite = new Benchmark.Suite;
var test1 = function() {
  return findNRooksSolution(3);
  // var solutionBoard = new Board(findNRooksSolution(n));
  // var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
  //   return memo + _.reduce(row, function(memo, col) {
  //     return memo + col;
  //   }, 0);
  // }, 0);
};
var test2 = function() {
  return findNRooksSolution(4);
  // var solutionBoard = new Board(findNRooksSolution(n));
  // var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
  //   return memo + _.reduce(row, function(memo, col) {
  //     return memo + col;
  //   }, 0);
  // }, 0);
};
// add tests
suite.add('test1', function() {
  // /o/.test('Hello World!');
  /o/.test(test1);
})
.add('test2', function() {
  // /o/.test('Hello World!');
  /o/.test(test2);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  for (key in this) {
    console.log(this[key].times);
  }
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });