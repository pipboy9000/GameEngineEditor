import input from "./input";

var canvas;
var ctx;
var width, height;
var halfWidth, halfHeight;

var zoom = 1;
var targetZoom = 1;

var camPosX = 0;
var targetCamPosX = 0;

var camPosY = 0;
var targetCamPosY = 0;

function init() {
  console.log("init canvas");
  canvas = document.getElementById("canvas");
  width = canvas.width;
  height = canvas.height;
  halfWidth = canvas.width / 2;
  halfHeight = canvas.height / 2;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ff0000";
}

function getRandomColor() {}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(-halfWidth / zoom + camPosX, -halfHeight / zoom + camPosY, width / zoom, height / zoom);
//   ctx.strokeStyle = "#FF0000";
//   ctx.strokeRect(-halfWidth / zoom + camPosX, -halfHeight / zoom + camPosY, width / zoom, height / zoom);
}

function draw() {
  zoom += (targetZoom - zoom) / 10;
  camPosX += (targetCamPosX - camPosX) / 5;
  camPosY += (targetCamPosY - camPosY) / 5;

  ctx.setTransform(
    zoom,
    0,
    0,
    zoom,
    -camPosX * zoom + halfWidth,
    -camPosY * zoom + halfHeight
  );
}

function setZoom(z) {
  targetZoom = z;
}

function getZoom() {
  return zoom;
}

function setCamPos(x, y) {
  targetCamPosX = x;
  targetCamPosY = y;
}

function getCamPos() {
  return { x: camPosX, y: camPosY };
}

function panCam(x, y) {
//   if (zoom >= 1) {
//     targetCamPosX += x * zoom * 2;
//     targetCamPosY += y * zoom * 2;
//   } else {
//     targetCamPosX += x / zoom;
//     targetCamPosY += y / zoom;
//   }
    targetCamPosX += x;
    targetCamPosY += y;
}

init();

export default {
  canvas,
  ctx,
  width,
  height,
  clearCanvas,
  draw,
  setZoom,
  getZoom,
  getCamPos,
  setCamPos,
  camPosX,
  camPosY,
  halfWidth,
  halfHeight,
  panCam
};
