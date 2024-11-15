const gameArea = document.getElementById("gameArea");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");

const collisionSound = new Audio("../audio/ding.wav");
const scoreSound = new Audio("../audio/cow-bell.wav");

const volumeLevel = 1.0

collisionSound.volume = 0.7 * volumeLevel;
scoreSound.volume = 0.3 * volumeLevel;

let ballSpeedX = 2;
let ballSpeedY = 2;
let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2;
let paddle1Y = gameArea.clientHeight / 2 - paddle1.clientHeight / 2;
let paddle2Y = gameArea.clientHeight / 2 - paddle2.clientHeight / 2;

let player1Score = 0;
let player2Score = 0;

document.addEventListener("keydown", (e) => {
  // Control paddle1 with W and S keys
  if (e.key === "w" && paddle1Y > 0) paddle1Y -= 10;
  if (e.key === "s" && paddle1Y < gameArea.clientHeight - paddle1.clientHeight) paddle1Y += 10;

  // Control paddle2 with ArrowUp and ArrowDown keys
  if (e.key === "ArrowUp" && paddle2Y > 0) paddle2Y -= 10;
  if (e.key === "ArrowDown" && paddle2Y < gameArea.clientHeight - paddle2.clientHeight) paddle2Y += 10;
});

const handleScore = () => {
  const player1Scored = ballX >= gameArea.clientWidth - ball.clientWidth;
  const player2Scored = ballX <= 0;

  if (player1Scored) {
    player1Score++;
  } else if (player2Scored) {
    player2Score++;
  }

  // Update scores
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;

  // Ball out of bounds (left or right)
  if (player1Scored || player2Scored) {
    scoreSound.play();

    // reset ball position to the center
    ballX = gameArea.clientWidth / 2;
    ballY = gameArea.clientHeight / 2;

    // change ball to go in the direction of the player who scored
    ballSpeedX = -ballSpeedX;
  }
};

function gameLoop() {
  // Update paddles' positions
  paddle1.style.top = `${paddle1Y}px`;
  paddle2.style.top = `${paddle2Y}px`;

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
    collisionSound.play();
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    (ballX <= paddle1.clientWidth && ballY + ball.clientHeight > paddle1Y && ballY < paddle1Y + paddle1.clientHeight) ||
    (ballX >= gameArea.clientWidth - paddle2.clientWidth - ball.clientWidth &&
      ballY + ball.clientHeight > paddle2Y &&
      ballY < paddle2Y + paddle2.clientHeight)
  ) {
    collisionSound.play();
    ballSpeedX = -ballSpeedX;
  }

  handleScore();

  // Set ball position
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(gameLoop);
}

gameLoop();
