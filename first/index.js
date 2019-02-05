///<reference path="../node_modules/@types/p5/global.d.ts"/>

function setup() {
  createCanvas(600, 400);
}

let x = 0;

function draw() {
  background(126);
  ellipse(mouseX, mouseY, 80, 80);
}