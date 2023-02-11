const changeScript = () => {
  runScript = eval(document.getElementById('code').value)
  game = new Game(GAME_SIZE)
  const scoreDisplay = document.getElementById("score")
  scoreDisplay.innerHTML = game.getScore()
}