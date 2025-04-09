const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 15;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Draw function
function draw() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}

// Update function
function update() {
  // Move right paddle with simple AI
  if (rightPaddleY + paddleHeight / 2 < ballY) {
    rightPaddleY += paddleSpeed;
  } else {
    rightPaddleY -= paddleSpeed;
  }

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with walls
  if (ballY + 10 > canvas.height || ballY - 10 < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    (ballX - 10 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
    (ballX + 10 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball passed paddles
  if (ballX - 10 < 0 || ballX + 10 > canvas.width) {
    // Reset ball position
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
}

// Keyboard input
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      leftPaddleY -= paddleSpeed;
      break;
    case 'ArrowDown':
      leftPaddleY += paddleSpeed;
      break;
  }
});

// Game loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();