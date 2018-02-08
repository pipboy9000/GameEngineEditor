import input from "./input.js";
import canvas from "./canvas.js";

var zoom = 1;

var wallStartX, wallStartY, wallEndX, wallEndY;
var wallStart = false;

var level = {};

var walls = [
  {
    x1: 300,
    y1: 50,
    x2: 550,
    y2: 300
  },
  {
    x1: 550,
    y1: 300,
    x2: 300,
    y2: 550
  },
  {
    x1: 300,
    y1: 550,
    x2: 50,
    y2: 50
  },
  {
    x1: 50,
    y1: 50,
    x2: 300,
    y2: 50
  },
  {
    x1: 350,
    y1: 270,
    x2: 300,
    y2: 250
  },
  {
    x1: 300,
    y1: 250,
    x2: 250,
    y2: 300
  },
  {
    x1: 250,
    y1: 300,
    x2: 350,
    y2: 270
  }
];

function move() {
  //zoom
  if (input.mouse.wheel > 0) {
    zoom += 0.1;
  }

  if (input.mouse.wheel < 0) {
    zoom -= 0.1;
  }

  if (zoom < 0.1) zoom = 0.1;
  canvas.setZoom(zoom);

  //pan
  if (input.mouse.middle) {
    canvas.panCam(-input.mouse.dWorldX, -input.mouse.dWorldY);
  }

  if (input.mouse.doubleClick) {
    drawWall();
  }

  if (input.mouse.left && wallStart) {
    continuWall;
  }
  console.log(zoom, input.mouse.worldX, input.mouse.worldY);
}

function addWall(x1, y1, x2, y2) {
  walls.push({
    x1,
    y1,
    x2,
    y2
  });
}

function drawWall() {
  if (!wallStart) {
    startWall();
  } else {
    finishWall();
  }
}

function startWall() {
  wallStart = true;
  wallStartX = input.mouse.worldX;
  wallStartY = input.mouse.worldY;
}

function continuWall() {}

function finishWall() {
  wallStart = false;
}

function draw() {
  //draw grid
  canvas.clearCanvas();
  canvas.ctx.beginPath();
  canvas.ctx.strokeStyle = "green";
  canvas.ctx.lineWidth = 3;
  canvas.ctx.arc(0, 0, 15, 0, Math.PI * 2);
  canvas.ctx.stroke();

  walls.forEach(wall => {
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = "orange";
    canvas.ctx.moveTo(wall.x1, wall.y1);
    canvas.ctx.lineTo(wall.x2, wall.y2);
    canvas.ctx.stroke();
  });

  if(wallStart){
    //   console.log(wallStartX, wallStartY, input.mouse.WorldX, input.mouse.WorldY)
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = "green";
    canvas.ctx.moveTo(wallStartX, wallStartY);
    canvas.ctx.lineTo(input.mouse.worldX, input.mouse.worldY);
    canvas.ctx.stroke();
  }
}

function init() {
  console.log("init viewport");
}

init();

export default { move, draw };
