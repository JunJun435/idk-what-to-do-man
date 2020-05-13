var board = document.getElementById("board");
var header = document.getElementById("header");
var playAgain = document.getElementById("playAgain");

playAgain.onclick = buttonClicked;

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

var snakeTimer = true;

var gameOverFlag = false;

init();

/* functions*/

function init()
{
    createBoardDivs();
    /* this is to color the outer most blocks on the board so that player knows that if the snake hits it, it's game over. */
    outerBoardDivs();
    renderAll();

    window.onkeydown = keyFunction;

    startSnakeTimer();
}

function buttonClicked() {
  startSnakeTimer();

    snake.direction = "";
    snake.row = 9;
    snake.column = 9;
    snake.body = [];
    snake.length = 0;

    snakeFood.row = 4;
    snakeFood.column = 9;

    outerBoardDivs();
    renderAll();

    gameOverFlag = false;

}

function outerBoardDivs() {
    for (var row = 0; row < totalRows; row++) {
      for (var column = 0; column < totalColumns; column++) {

          if ((row == 0) || (row == totalRows-1) || (column == 0) || (column == totalColumns-1)) {
              boardDiv[row][column].style.backgroundColor = "yellow";
          } else {
              boardDiv[row][column].style.backgroundColor = "transparent";
          }
      }
    }
}

function renderAll() {
  boardDiv[snakeFood.row][snakeFood.column].style.backgroundColor = "green"; 
  boardDiv[snake.row][snake.column].style.backgroundColor = "coral";
  for (var i = 0; i < snake.body.length; i++) {
       var segment = snake.body[i];
        boardDiv[segment.row][segment.column].style.backgroundColor = "tomato";

 }
 header.innerHTML = "Random Weeb's Snake Game | Score : " + snake.length;
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
        if (snake.direction != "DOWN") {
        snake.direction = "UP";
        }
        break;
      case "ArrowDown":
        if (snake.direction != "UP") {
        snake.direction = "DOWN";
        }
        break;
      case "ArrowRight":
        if (snake.direction != "LEFT") {
        snake.direction = "RIGHT";
        }
        break;
      case "ArrowLeft":
        if (snake.direction != "RIGHT") {
        snake.direction = "LEFT";
      }
        break;
    }
    console.log("Your Snake is at ( " + snake.row + ", " + snake.column + ") ");
}

function collisionChecker() {
    if ((snake.row == 0) || (snake.row == totalRows - 1) || (snake.column == 0) || (snake.column == totalColumns - 1)) {
      gameOver();
    }

    for (var i = 0; i < snake.body.length; i++) {
        var segment = snake.body[i];
        if ((snake.row == segment.row) && (snake.column == segment.column)) {
        gameOver();
        return;
      }
    }
    if ((snake.row == snakeFood.row) && (snake.column == snakeFood.column)) {
        console.log ("NOM NOM NOM, your snake ate an apple... YUMMY!!");
        snake.length++;
        moveSnakeFood(); 
    }
}

function moveSnakeFood() {
  var emptyBlocks = [];

  for (var row = 1; row < totalRows-1; row++) {
      for (var column = 1; column < totalColumns-1; column++) {
        var snakeHeadFlag = false;
        var snakeBodyFlag = false;

        if ((row == snake.row) && (column == snake.column)) {
            snakeHeadFlag = true;
        } 
        
        else {
          for (var i = 0; i < snake.body.length; i++) {
              var segment = snake.body[i];
              if ((row == segment.row) && (column == snake.column)) {
                snakeBodyFlag = true;
                break;
              }
          }
        }

        if (!snakeHeadFlag && !snakeBodyFlag) {
          emptyBlocks.push( { row:row, column:column} ); 
        }
      }
  }

  var index = getRndInteger(0, emptyBlocks.length-1);
  
  snakeFood.row = emptyBlocks[index].row;
  snakeFood.column = emptyBlocks[index].column;
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
