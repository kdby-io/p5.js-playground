const SIZE = 20
let GRID_SPACE

let snake
let apple

function setup() {
  createCanvas(
    min(windowWidth, windowHeight),
    min(windowWidth, windowHeight)
  )
  rectMode(CENTER)
  frameRate(5)

  GRID_SPACE = width / SIZE

  snake = new Snake()
  apple = new Apple()
}

function draw() {
  background(40, 60, 80)

  showEdge()
  snake.move()

  if (apple.pos.x == snake.body[0].x && apple.pos.y == snake.body[0].y) {
    snake.eat()
    apple = new Apple()
  }

  apple.show()
  snake.show()

}

function keyPressed() {
  snake.direction = keyCode
}

const showEdge = () => {
  push()

  noFill()
  stroke(10, 20, 30)
  strokeWeight(GRID_SPACE)

  rect(width / 2, height / 2, width - GRID_SPACE, height - GRID_SPACE)

  pop()
}

class Snake {
  constructor() {
    const x = floor(random(1, SIZE-1))
    const y = floor(random(1, SIZE-1))
    this.score = 1
    this.body = [createVector(x, y)]
    this.direction = null
  }

  show() {
    push()

    noStroke()
    fill(255)
    this.body.forEach(body => {
      rect(
        body.x * GRID_SPACE + (GRID_SPACE / 2),
        body.y * GRID_SPACE + (GRID_SPACE / 2),
        GRID_SPACE,
        GRID_SPACE,
      )
    })

    pop()
  }

  move() {
    const head = snake.body[0]

    switch (this.direction) {
      case LEFT_ARROW:
        this.body.unshift(createVector(head.x-1, head.y))
        break;
      case RIGHT_ARROW:
        this.body.unshift(createVector(head.x+1, head.y))
        break;
      case UP_ARROW:
        this.body.unshift(createVector(head.x, head.y-1))
        break;
      case DOWN_ARROW:
        this.body.unshift(createVector(head.x, head.y+1))
        break;
    }

    snake.body = snake.body.slice(0, this.score)
  }

  eat() {
    this.score += 1
    this.body.push(createVector(this.body[0].x, this.body[0].y))
  }
}

class Apple {
  constructor() {
    const x = floor(random(1, SIZE-1))
    const y = floor(random(1, SIZE-1))
    this.pos = createVector(x, y)
  }

  show() {
    push()

    noStroke()
    fill(255,0,0)
    rect(
      this.pos.x * GRID_SPACE + (GRID_SPACE / 2),
      this.pos.y * GRID_SPACE + (GRID_SPACE / 2),
      GRID_SPACE,
      GRID_SPACE,
    )

    pop()
  }
}
