let game
let runScript

const GAME_SIZE = 20

function setup() {
  createCanvas(400, 400)
  rectMode(CENTER)
  frameRate(5)

  game = new Game(GAME_SIZE)
  runScript = eval(document.getElementById('code').value)

  const scoreDisplay = document.getElementById("score")
  scoreDisplay.innerHTML = game.getScore()
}

function draw() {
  background(40, 60, 80)

  game.play()
  game.show()
}

// function keyPressed() {
//   game.snake.direction = keyCode
// }

class Game {
  #score

  constructor(size) {
    this.SIZE = size
    this.GRID_SPACE = width / (size + 2)

    this.gameover = false
    this.#score = 0
    this.snakeMap = new Array(size).fill(new Array(size).fill(false))

    this.snake = new Snake(this)
    this.apple = new Apple(this)
  }

  getScore() {
    return this.#score
  }
  
  play() {
    if (this.gameover) return

    this.snake.move(this.apple)
    if (this.apple.pos.x == this.snake.body[0].x && this.apple.pos.y == this.snake.body[0].y) {
      this.#score += 1
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

    if (this.game.gameover) {
        push()
        fill(255, 0, 255)

        const head = this.body[0]
        rect(
          posToDisplay(head.x, this.game.GRID_SPACE),
          posToDisplay(head.y, this.game.GRID_SPACE),
          this.game.GRID_SPACE,
          this.game.GRID_SPACE,
        )

        pop()
    }

    pop()
  }

  move(apple) {
    const publicBody = this.body.map(v => ({x: v.x, y: v.y}))
    const publicApple = {x: apple.pos.x, y: apple.pos.y }
    this.direction = runScript(publicBody, publicApple)

    const head = this.body[0]
    let nextHead

    switch (this.direction) {
      case LEFT_ARROW:
        nextHead = createVector(head.x-1, head.y)
        break;
      case RIGHT_ARROW:
        nextHead = createVector(head.x+1, head.y)
        break;
      case UP_ARROW:
        nextHead = createVector(head.x, head.y-1)
        break;
      case DOWN_ARROW:
        nextHead = createVector(head.x, head.y+1)
        break;
      default:
        nextHead = head
    }

    this.body.unshift(nextHead)
    this.body = this.body.slice(0, this.game.getScore() + 1)
    // console.log(nextHead.x, nextHead.y)

    if (nextHead.x < 0 || GAME_SIZE <= nextHead.x || nextHead.y < 0 || GAME_SIZE <= nextHead.y) {
      this.game.gameover = true
      return
    }

    // check body collpa
    this.body.slice(1).forEach(v => {
      if (nextHead.x === v.x && nextHead.y === v.y) {
        this.game.gameover = true
        return
      }
    })

    this.game.snakeMap = new Array(this.game.SIZE).fill(new Array(this.game.SIZE).fill(false))
    this.body.forEach(body => {
      this.game.snakeMap[body.x][body.y] = true
    })
  }

  eat() {
    this.body.push(createVector(this.body[0].x, this.body[0].y))

    const scoreDisplay = document.getElementById("score")
    scoreDisplay.innerHTML = this.game.getScore()
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
