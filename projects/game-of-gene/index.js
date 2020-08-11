const FIRST_POPULATION_COUNT = 5000;
const SIZE = 300;

let world = generateWorld();

class Gene {
  constructor(bias) {
    this.bias = bias;
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
  }
}

class Life {
  constructor(gene) {
    this.gene = gene;
  }
}

function generateWorld() {
  return new Array(SIZE).fill(0).map(() => new Array(SIZE).fill(null));
}

function initialize() {
  for (let bias = 0; bias < 8; bias++) {
    const gene = new Gene(bias);

    for (let i = 0; i < FIRST_POPULATION_COUNT; i++) {
      const y = Math.floor(Math.random() * height);
      const x = Math.floor(Math.random() * width);
      world[y][x] = new Life(gene);
    }
  }
}

function generateChild(x, y) {
  const selected = world[y][x];
  const parents = [];
  if (selected !== null) {
    parents.push(selected);
  }

  let neighborCount = 0;

  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  neighbors.forEach(([dx, dy], i) => {
    const neighborX = (x + dx + SIZE) % SIZE;
    const neighborY = (y + dy + SIZE) % SIZE;
    const neighbor = world[neighborY][neighborX];

    if (neighbor) {
      parents.push(neighbor);
      neighborCount++;
    }
  });

  if (selected !== null) {
    neighborCount = (neighborCount + selected.gene.bias) % 8;
    return [1, 3, 4].includes(neighborCount) ? selectGene(parents) : null;
  } else {
    return [3].includes(neighborCount) ? selectGene(parents) : null;
  }
}

function selectGene(parents) {
  const index = Math.floor(Math.random() * parents.length);
  return new Life(parents[index].gene);
}

function setup() {
  createCanvas(SIZE, SIZE);

  initialize();
}

function draw() {
  background(0);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const life = world[y][x];
      if (life !== null) {
        fill(...life.gene.color);
        noStroke();
        square(x, y, 1);
      }
    }
  }

  const newWorld = generateWorld();

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      newWorld[y][x] = generateChild(x, y);
    }
  }

  world = newWorld;
}
