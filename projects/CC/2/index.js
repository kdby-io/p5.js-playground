class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r;
  }

  generate() {
    const boxes = [];
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          if (abs(x) + abs(y) + abs(z) <= 1) {
            continue;
          }
          const r = this.r / 3;
          const b = new Box(
            this.pos.x + x * r,
            this.pos.y + y * r,
            this.pos.z + z * r,
            r
          );
          boxes.push(b);
        }
      }
    }

    return boxes;
  }

  show() {
    const { x, y, z } = this.pos;
    push();
    translate(x, y, z);
    box(this.r);
    pop();
  }
}

let angle = 0;
let boxes;

function setup() {
  createCanvas(400, 400, WEBGL);
  boxes = [new Box(0, 0, 0, 200)];
  pointLight(255, 255, 255, width, height, width);
}

function mouseClicked() {
  nextBoxes = [];
  boxes.forEach((box) => {
    nextBoxes.push(...box.generate());
  });
  boxes = nextBoxes;
}

function draw() {
  background(51);
  noStroke();

  rotateX(angle);
  rotateY(angle);
  boxes.forEach((b) => b.show());

  angle += 0.01;
}
