let game

function setup() {
  createCanvas(
    min(windowWidth, windowHeight),
    min(windowWidth, windowHeight)
  )
  rectMode(CENTER)
  frameRate(5)

  game = new Game(20)
}

function draw() {
  background(40, 60, 80)

  game.play()
  game.show()
}

function keyPressed() {
  game.snake.direction = keyCode
}

class Game {
  constructor(size) {
    this.SIZE = size
    this.GRID_SPACE = width / (size + 2)

    this.score = 0
    this.snakeMap = new Array(size).fill(new Array(size).fill(false))

    this.snake = new Snake(this)
    this.apple = new Apple(this)
  }
  
  play() {
    this.snake.move()
    if (this.apple.pos.x == this.snake.body[0].x && this.apple.pos.y == this.snake.body[0].y) {
      this.snake.eat()
      this.apple = new Apple(this)
    }
  }

  show() {
    this.showEdge()
    this.apple.show()
    this.snake.show()
  }

  showEdge() {
    push()

    noFill()
    stroke(10, 20, 30)
    strokeWeight(this.GRID_SPACE)

    rect(width / 2, height / 2, width - this.GRID_SPACE, height - this.GRID_SPACE)

    pop()
  }
}

class Snake {
  constructor(game) {
    this.game = game
    const x = floor(random(game.SIZE))
    const y = floor(random(game.SIZE))
    this.body = [createVector(x, y)]
    game.snakeMap[x][y] = true
    this.direction = null
  }

  show() {
    push()

    noStroke()
    fill(255)
    this.body.forEach(body => {
      rect(
        posToDisplay(body.x, this.game.GRID_SPACE),
        posToDisplay(body.y, this.game.GRID_SPACE),
        this.game.GRID_SPACE,
        this.game.GRID_SPACE,
      )
    })

    pop()
  }

  move() {
    const head = this.body[0]

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

    this.body = this.body.slice(0, this.game.score + 1)

    this.game.snakeMap = new Array(this.game.SIZE).fill(new Array(this.game.SIZE).fill(false))
    this.body.forEach(body => {
      this.game.snakeMap[body.x][body.y] = true
    })
  }

  eat() {
    this.game.score += 1
    this.body.push(createVector(this.body[0].x, this.body[0].y))
  }
}

class Apple {
  constructor(game) {
    this.game = game
    let x, y
    do {
      x = floor(random(game.SIZE))
      y = floor(random(game.SIZE))
      this.pos = createVector(x, y)
    } while (game.snakeMap[x][y] === true);
  }

  show() {
    push()

    noStroke()
    fill(255,0,0)
    rect(
      posToDisplay(this.pos.x, this.game.GRID_SPACE),
      posToDisplay(this.pos.y, this.game.GRID_SPACE),
      this.game.GRID_SPACE,
      this.game.GRID_SPACE,
    )

    pop()
  }
}

const posToDisplay = (pos, gridSpace) => (pos+1) * gridSpace + (gridSpace / 2)
