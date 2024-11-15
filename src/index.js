const gameArea = document.getElementById("gameArea");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");

let ballSpeedX = 2;
let ballSpeedY = 2;
let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2;
let paddle1Y = gameArea.clientHeight / 2 - paddle1.clientHeight / 2;
let paddle2Y = gameArea.clientHeight / 2 - paddle2.clientHeight / 2;

// Control paddle1 with W and S keys
document.addEventListener("keydown", (e) => {
  if (e.key === "w" && paddle1Y > 0) paddle1Y -= 10;
  if (e.key === "s" && paddle1Y < gameArea.clientHeight - paddle1.clientHeight) paddle1Y += 10;
});

// Control paddle2 with ArrowUp and ArrowDown keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && paddle2Y > 0) paddle2Y -= 10;
  if (e.key === "ArrowDown" && paddle2Y < gameArea.clientHeight - paddle2.clientHeight) paddle2Y += 10;
});

function gameLoop() {
  // Update paddles' positions
  paddle1.style.top = `${paddle1Y}px`;
  paddle2.style.top = `${paddle2Y}px`;

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    (ballX <= paddle1.clientWidth && ballY + ball.clientHeight > paddle1Y && ballY < paddle1Y + paddle1.clientHeight) ||
    (ballX >= gameArea.clientWidth - paddle2.clientWidth - ball.clientWidth &&
      ballY + ball.clientHeight > paddle2Y &&
      ballY < paddle2Y + paddle2.clientHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds (left or right)
  if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
    ballX = gameArea.clientWidth / 2;
    ballY = gameArea.clientHeight / 2;
    ballSpeedX = -ballSpeedX;
  }

  // Set ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(gameLoop);
}

gameLoop();
