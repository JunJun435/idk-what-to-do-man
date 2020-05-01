var board = document.getElementById("board");
var header = document.getElementById("header");

var totalRows = 19;
var totalColumns = 19;

var boardDiv = []

var blockSize = 30;

var snake = {
    direction: "",
    row: 9,
    column: 9,
    body: [],
    length: 0,
};

var snakeFood = {
    row: 4,
    column: 9,
};

var snakeTimer = false;

var gameOverFlag = false;

init();

/* functions*/

function init()
{
    createBoardDivs();
    renderAll();

    window.onkeydown = keyFunction;

    startSnakeTimer();
}

function renderAll() {
  boardDiv[snakeFood.row][snakeFood.column].style.backgroundColor = "green"; 
  boardDiv[snake.row][snake.column].style.backgroundColor = "coral";
  for (var i = 0; i < snake.body.length; i++) {
       var segment = snake.body[i];
        boardDiv[segment.row][segment.column].style.backgroundColor = "tomato";

 }
 header.innerHTML = "Random Asian's Snake Game | Score : " + snake.length;
}

function moveSnake() {
    boardDiv[snake.row][snake.column].style.backgroundColor = "transparent";
    for (var i = 0; i < snake.body.length; i++) {
         var segment = snake.body[i];
         boardDiv[segment.row][segment.column].style.backgroundColor = "transparent";
    }

    snake.body.unshift({row:snake.row, column:snake.column});
    snake.body.length = snake.length;
    console.log(snake.body);
    
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

function collisionChecker() {
    if ((snake.row == 0) || (snake.row == totalRows - 1) || 
        (snake.column == 0) || (snake.column == totalColumns - 1)) {
      gameOver();
    }

    if ((snake.row == snakeFood.row) && (snake.column == snakeFood.column)) {
        console.log ("Your snake ate an apple... YUMMY!!");
        snake.length++;
        moveSnakeFood(); 
    }
}

function moveSnakeFood() {
  snakeFood.row = getRndInteger(1, totalRows - 2); 
  snakeFood.column = getRndInteger(1, totalColumns - 2);
}
function gameOver() {
  console.log("HAHA LOSER!");
  gameOverFlag = true;
  stopSnakeTimer();
}
function startSnakeTimer() {
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
  if (!gameOverFlag) {
    moveSnake();
    collisionChecker();
    renderAll();
  }
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
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
