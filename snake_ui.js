(function() {
	if (typeof SnakeGame === "undefined") {
		window.SnakeGame = {};
	}
	
	var View = SnakeGame.View = function(el) {
		this.$el = el;
		this.board;
	};
	
	View.prototype.start = function() {
		var that = this;
		this.board = new SnakeGame.Board();
		SnakeGame.intervalId = setInterval(that.step.bind(that), 100);
		SnakeGame.PAUSED = false;
		
		$(document).on("keydown", function(event) {
			event.preventDefault();

			var keyNum = event.which;
			
			if(keyNum === 32) {
				if(SnakeGame.PAUSED === false) {
					clearInterval(SnakeGame.intervalId);
					SnakeGame.PAUSED = true;
				}
				else {
					SnakeGame.intervalId = setInterval(that.step.bind(that), 100);
					SnakeGame.PAUSED = false;
				}
			}
			else if (keyNum >= 37 && keyNum <= 40) {
				that.handleKeyEvent(keyNum);
			}
		});
	}
	
	View.prototype.handleKeyEvent = function (num) {
		var board = this.board;
		var snake = board.snake;
		if (num === 37) {
			snake.turn('W');
		}
		else if (num === 38) {
			snake.turn('N');
		}
		else if (num === 39) {
			snake.turn('E');
		}
		else if (num === 40) {
			snake.turn('S');
		}
	}
	
	View.prototype.step = function() {
		var board = this.board;
		var snake = board.snake;
		var snakeHead = snake.segments[snake.segments.length - 1];

		if(board.snakeInFront()) {
			$("#losing-message").addClass("lose");
		}
		else if(board.appleInFront()) {
			snake.move("grow");
			board.apples.pop();
			$("#score").html(snake.segments.length - 1);
			
			do {
				var randomRow = Math.floor(Math.random() * SnakeGame.Board.DIM_ROW);
				var randomCol = Math.floor(Math.random() * SnakeGame.Board.DIM_COL);
			} while(randomRow === snakeHead[0] && randomCol === snakeHead[1])

			board.apples.push([randomRow, randomCol]);
		}
		else {
			snake.move();
		}
		board.updateBoard();
		this.draw();
		
	}
	
	View.prototype.draw = function () {
		var board = this.board;
		$("li").removeClass();
		
		for(var i = 0; i < 20; i++) {
			for (var j = 0; j < 20; j++) {
				if(board.board[i][j] === "S"){
					$("#"+i+"_"+j).addClass("has-snake");
				}
				else if (board.board[i][j] === "A") {
					$("#"+i+"_"+j).addClass("has-apple");
				}
			}
		}
	}
	
	
})();