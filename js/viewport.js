import input from "./input.js";
import canvas from "./canvas.js";
import files from "./files.js";

var zoom = 1;

var buttons = [];

var Modes = Object.freeze({
  clear: 1,
  drawWall: 2
});
var mode = Modes.clear;

var wallStartX, wallStartY, wallEndX, wallEndY;
var wallStart = false;

var level = {};

var tempWalls = [];

function move() {
  //zoom
  if (input.mouse.wheel > 0) {
    zoom += 0.1;
  }

  if (input.mouse.wheel < 0) {
    zoom -= 0.1;
  }

  if (zoom < 0.1) zoom = 0.1;
  if (zoom > 5) zoom = 5;

  canvas.setZoom(zoom);

  //pan
  if (input.mouse.middle) {
    canvas.panCam(-input.mouse.dWorldX, -input.mouse.dWorldY);
  }

  if (input.mouse.doubleClick && wallStart) {
    continuWall();
  } else if (input.mouse.doubleClick) {
    startWall();
  }
  //   console.log(zoom, input.mouse.worldX, input.mouse.worldY);
}

function changeMode(_mode) {
  mode = _mode;
  console.log(mode);
}

function btnChangeMode(_mode) {
  return changeMode(_mode)
}

function distance(x1, y1, x2, y2) {
  var dist = Math.hypot(x2 - x1, y2 - y1);
  console.log(dist);
  return dist;
}

function addWall(x1, y1, x2, y2) {
  walls.push({
    x1,
    y1,
    x2,
    y2
  });
}

function startWall() {
  wallStart = true;
  wallStartX = input.mouse.worldX;
  wallStartY = input.mouse.worldY;
}

function continuWall() {
  console.log(input.mouse.worldX, input.mouse.worldY, wallStartX, wallStartY);
  if (
    distance(input.mouse.worldX, input.mouse.worldY, wallStartX, wallStartY) < 25
  ) {
    finishWall();
  } else {
    addWall(wallStartX, wallStartY, input.mouse.worldX, input.mouse.worldY);
    wallStartX = input.mouse.worldX;
    wallStartY = input.mouse.worldY;
  }
}

function finishWall() {
  wallStart = false;
  console.log(walls);
}

function drawWalls(Walls, color) {
  if (color) canvas.ctx.strokeStyle = color;

  walls.forEach(wall => {
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = "orange";
    canvas.ctx.moveTo(wall.x1, wall.y1);
    canvas.ctx.lineTo(wall.x2, wall.y2);
    canvas.ctx.stroke();
  });
}

function drawGrid() {
  var camPos = canvas.getCamPos();
  var gridStartX = -canvas.halfWidth / canvas.getZoom() + camPos.x;
  var gridStartY = -canvas.halfHeight / canvas.getZoom() + camPos.y;
  var gridEndX = gridStartX + canvas.width;
  var gridEndY = gridEndY + canvas.height;

  if (canvas.getZoom() >= 1) {
    for (var i = 0; i < 5; i++) {
      
    }
  }

  canvas.ctx.beginPath();
  canvas.ctx.strokeStyle = "green";
  canvas.ctx.lineWidth = 3;
  canvas.ctx.arc(0, 0, 15, 0, Math.PI * 2);
  canvas.ctx.stroke();
}

function draw() {

  drawGrid();

  if (level.walls) {
    drawWalls(level.walls, "green");
  }

  if (wallStart) {
    //   console.log(wallStartX, wallStartY, input.mouse.WorldX, input.mouse.WorldY)
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = "green";
    canvas.ctx.moveTo(wallStartX, wallStartY);
    canvas.ctx.lineTo(input.mouse.worldX, input.mouse.worldY);
    canvas.ctx.stroke();
  }
}

function initInterface() {
  //init buttons
  var wallModeBtn = document.getElementById("wallMode");

  wallModeBtn.onclick = function () {
    changeMode(Modes.drawWall);
  }
}

function init() {
  console.log("init viewport");
  initInterface();
}

init();

export default {
  move,
  draw
};