const ct = document.getElementById("snakeboard");
const ct = cv.getContext("2d");

ct.strokeStyle = "#fff";
ct.strokeRect(0, 0, 600, 600);

let snake = [];
let length = 40;
let score = 0;
let direction;
