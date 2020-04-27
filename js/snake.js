var board = document.getElementById("board");
var header = document.getElementById("header");

var totalRows = 17;
var totalColumns = 17;

var boardDiv = []

var blockSize = 30;

/* functions*/

function init()
{
    createBoardDivs();
}

function createBoardDivs()
{
  board.style.width = blockSize * totalColumns + "px";
  board.style.height = bloackSize * totalRows + "px";

}
