///<reference path="../../../node_modules/@types/p5/global.d.ts"/>

// https://www.youtube.com/watch?v=17WoOqgXsRM

let speed;
class Star {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width);
  }

  update() {
    this.prev_z = this.z;
    this.z = this.z - speed;

    const isOutOfCanvas = this.z < 1;
    if (isOutOfCanvas) {
      this.initialize();
    }
  }

  show() {
    fill(255);
    noStroke();

    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);

    const r = map(this.z, 0, width, 4, 0);
    ellipse(sx, sy, r, r);

    stroke(100);

    const prev_sx = map(this.x / this.prev_z, 0, 1, 0, width);
    const prev_sy = map(this.y / this.prev_z, 0, 1, 0, height);

    const isIntialized = this.prev_z > this.z;
    if (isIntialized) {
      line(prev_sx, prev_sy, sx, sy);
    }
  }
}

const stars = [];
const starCount = 400;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < starCount; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background(0);

  speed = map(mouseX, 0, width, 0, 20);

  // Set anchor point to center
  translate(width / 2, height / 2);

  stars.forEach((star) => {
    star.update();
    star.show();
  });
}
