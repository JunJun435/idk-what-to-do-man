var board = document.getElementById("board");
var header = document.getElementById("header");

var totalRows = 19;
var totalColumns = 19;

var boardDiv = []

var blockSize = 30;

var snake = {
    direction: "",
    row: 10,
    column: 10,
};

var snakeTimer = false;

init();

/* functions*/

function init()
{
    createBoardDivs();
    renderAll();

    window.onkeydown = keyFunction;
}

function renderAll() {
 boardDiv[snake.row][snake.column].style.backgroundColor = "coral";
}

function moveSnake() {
    boardDiv[snake.row][snake.column].style.backgroundColor = "transparent";
    
    switch(snake.direction) {
        case "UP":
          snake.row--;
          break;
        case "DOWN":
          snake.row++;
          break;
        case "RIGHT":
          snake.column++;
          break;
        case "LEFT":
          snake.column--;
          break;
    }
}

function keyFunction() {
    switch (event.key) {
      case "ArrowUp":
        snake.direction = "UP";
        break;
      case "ArrowDown":
        snake.direction = "DOWN";
        break;
      case "ArrowRight":
        snake.direction = "RIGHT";
        break;
      case "ArrowLeft":
        snake.direction = "LEFT";
        break;
    }
    console.log("Your Snake is at ( " + snake.row + ", " + snake.column + ") ");
}

function startSnakeTimer() 
{
    stopSnakeTimer();
    snakeTimer = setInterval(tickSnakeTimer, 100);
}

function stopSnakeTimer() {
    if (snakeTimer) {
        clearInterval(snakeTimer);
        snakeTimer = false;
    }
}

function tickSnakeTimer() {
    moveSnake();
    renderAll();
}

function createBoardDivs() {

  /* this function is used to calculate the width and height based on the # of rows & columns*/
  board.style.width = blockSize * totalColumns + "px";
  board.style.height = blockSize * totalRows + "px";

  boardDiv = [];

  for (var row = 0; row < totalRows; row++) {

    boardDiv[row] = [];

    for (var column = 0; column < totalColumns; column++) {

        boardDiv[row][column] = document.createElement("div");
        board.appendChild(boardDiv[row][column]);

        boardDiv[row][column].style.position = "absolute";
        boardDiv[row][column].style.left = (column * blockSize) + "px";
        boardDiv[row][column].style.top = (row * blockSize) + "px"

        boardDiv[row][column].style.width = blockSize + "px";
        boardDiv[row][column].style.height = blockSize + "px";

        boardDiv[row][column].style.border = "1px solid black";
        boardDiv[row][column].style.boxSizing = "border-box";
    }

  }
}
