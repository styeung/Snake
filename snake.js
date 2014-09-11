(function  () {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}
	
	var Snake = SnakeGame.Snake = function () {
		this.dir = Snake.DIRS[Math.floor(Math.random() * 4)];
		this.segments = [[10, 10]];
	};
	
	Snake.DIRS = ["N", "E", "S", "W"];
	Snake.DIM_ROW = 20;
	Snake.DIM_COL = 20;
	
	Snake.prototype.move = function() {
		this.segments.push(this.nextMove(this.dir));
		
		if(arguments.length === 0) {
			this.segments.shift();
		}
	};
	
	Snake.prototype.nextMove = function(dir) {
		var segmentLength = this.segments.length
		var headSegment = this.segments[segmentLength - 1].slice(0);
		
		if (dir === "N") {
			return Snake.wrap([headSegment[0] - 1, headSegment[1]]);
		}
		else if (dir === "E") {
			return Snake.wrap([headSegment[0], headSegment[1] + 1]);
		}
		else if (dir === "S") {
			return Snake.wrap([headSegment[0] + 1, headSegment[1]]);
		}
		else if (dir === "W") {
			return Snake.wrap([headSegment[0], headSegment[1] - 1]);
		}
	}

	
	Snake.wrap = function(newSegment) {
		if(newSegment[0] < 0 ) {
			newSegment[0] += Snake.DIM_ROW; 
		}
		else if (newSegment[0] >= Snake.DIM_ROW) {
			newSegment[0] -= Snake.DIM_ROW;
		}
		if (newSegment[1] < 0) {
			newSegment[1] += Snake.DIM_COL; 
		}
		else if (newSegment[1] >= Snake.DIM_COL) {
			newSegment[1] -= Snake.DIM_COL;
		}
		
		return newSegment;
	}
	
	Snake.prototype.turn = function(dir) {
		if(dir !== this.oppositeDirection()){
			this.dir = dir;
		}
	};
	
	Snake.prototype.oppositeDirection = function() {
		if(this.dir === "N") {
			return "S";
		}
		else if(this.dir === "S") {
			return "N";
		}
		else if(this.dir === "W") {
			return "E";
		}
		else if(this.dir === "E") {
			return "W";
		}
	}
	
	var Board = SnakeGame.Board = function () {
		this.board;
		this.snake = new SnakeGame.Snake();
		var randomRow = Math.floor(Math.random() * Board.DIM_ROW);
		var randomCol = Math.floor(Math.random() * Board.DIM_COL);
		this.apples = [[randomRow, randomCol]];
		this.updateBoard();
		
	};
	
	Board.DIM_ROW = 20;
	Board.DIM_COL = 20;
	
	Board.prototype.updateBoard = function() {
		var outputArray = [];
		for(var i = 0; i < Board.DIM_ROW; i++) {
			var tempArray = [];
			for (var j = 0; j < Board.DIM_COL; j++) {
				tempArray.push(".");
			}
			outputArray.push(tempArray);
		}
		
		for(var i = 0; i < this.apples.length; i++) {
			outputArray[this.apples[i][0]][this.apples[i][1]] = "A";
		}
		
		var snakeSegments = this.snake.segments;
		
		for(var i = 0; i < snakeSegments.length; i++) {
			outputArray[snakeSegments[i][0]][snakeSegments[i][1]] = "S";
		}
		
		this.board = outputArray;
	};
	
	Board.prototype.appleInFront = function() {
		var snake = this.snake
		var nextMove = snake.nextMove(snake.dir);
		
		if(this.board[nextMove[0]][nextMove[1]] === "A") {
			return true;
		}
		else {
			return false;
		}
	}
	
	Board.prototype.snakeInFront = function() {
		var snake = this.snake
		var nextMove = snake.nextMove(snake.dir);
		
		if(this.board[nextMove[0]][nextMove[1]] === "S") {
			return true;
		}
		else {
			return false;
		}
	}
	
	Board.prototype.render = function() {
		var outputString = "";
		for(var i = 0; i < this.board.length; i++) {
			var row = this.board[i];
			for(var j = 0; j < row.length; j++){
				outputString += row[j];
			}
			outputString += "\n";
		}
		
		return outputString;
	};
	
})();