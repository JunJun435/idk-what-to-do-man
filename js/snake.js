const ct = document.getElementById("snakeboard");
const ct = cv.getContext("2d");

ct.strokeStyle = "#fff";
ct.strokeRect(0, 0, 600, 600);

let snake = [];
let length = 40;
let score = 0;
let direction;

snake [0] = {
  x: 5 * length,
  y: 4 * length
};

let prey = {
  x: Math.floor(Math.random() * 5 + 1) * length,
  y: Math.floor(Math.random() * 6 + 1) * length
};

function getFrame(){


}

let snakeGame = setInterval(getFrame, 200)
