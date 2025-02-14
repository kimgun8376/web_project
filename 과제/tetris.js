const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

const COLS = 10;
const ROWS = 20;
let score = 0;

// 보드 배열 초기화
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

// 블록 정의
const TETROMINOS = [
  { shape: [[1, 1, 1], [0, 1, 0]], color: 'cyan' }, // T
  { shape: [[1, 1], [1, 1]], color: 'yellow' }, // O
  { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' }, // S
  { shape: [[0, 1, 1], [1, 1, 0]], color: 'red' }, // Z
  { shape: [[1, 0, 0], [1, 1, 1]], color: 'blue' }, // L
  { shape: [[0, 0, 1], [1, 1, 1]], color: 'purple' }, // J
  { shape: [[1, 1, 1, 1]], color: 'orange' }, // I
];

let currentPiece = null;
let currentPos = { x: 4, y: 0 };

// 보드 그리기
function drawBoard() {
  board.innerHTML = '';
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellDiv = document.createElement('div');
      cellDiv.style.backgroundColor = cell ? cell : '#333';
      board.appendChild(cellDiv);
    });
  });
}

// 랜덤 테트로미노 가져오기
function randomPiece() {
  const rand = Math.floor(Math.random() * TETROMINOS.length);
  return TETROMINOS[rand];
}

// 현재 테트로미노 그리기
function drawPiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const posX = currentPos.x + x;
        const posY = currentPos.y + y;
        grid[posY][posX] = currentPiece.color;
      }
    });
  });
  drawBoard();
}

// 테트로미노를 아래로 이동
function moveDown() {
  currentPos.y += 1;
  if (isColliding()) {
    currentPos.y -= 1;
    lockPiece();
  }
  drawBoard();
}

// 충돌 체크
function isColliding() {
  return currentPiece.shape.some((row, y) => {
    return row.some((cell, x) => {
      if (cell) {
        const posX = currentPos.x + x;
        const posY = currentPos.y + y;
        return posY >= ROWS || grid[posY][posX] !== null;
      }
      return false;
    });
  });
}

// 테트로미노 잠그기
function lockPiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const posX = currentPos.x + x;
        const posY = currentPos.y + y;
        grid[posY][posX] = currentPiece.color;
      }
    });
  });
  clearLines();
  currentPiece = randomPiece();
  currentPos = { x: 4, y: 0 };
  drawPiece();
}

// 라인 삭제
function clearLines() {
  grid = grid.filter(row => row.some(cell => cell === null));
  const linesCleared = ROWS - grid.length;
  score += linesCleared * 100;
  scoreDisplay.textContent = `점수: ${score}`;
  while (grid.length < ROWS) {
    grid.unshift(Array(COLS).fill(null));
  }
}

// 게임 시작
function startGame() {
  currentPiece = randomPiece();
  currentPos = { x: 4, y: 0 };
  drawPiece();
  let gameInterval = setInterval(() => {
    moveDown();
    if (isColliding()) {
      clearInterval(gameInterval);
      alert("게임 오버!");
    }
  }, 1000);
}

// 키 입력 처리
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') moveDown();
  if (e.key === 'ArrowLeft') currentPos.x -= 1;
  if (e.key === 'ArrowRight') currentPos.x += 1;
  if (e.key === 'ArrowUp') {
    const newShape = rotatePiece(currentPiece.shape);
    if (!isColliding(newShape)) {
      currentPiece.shape = newShape;
    }
  }
  drawBoard();
});

function rotatePiece(piece) {
  return piece[0].map((_, index) => piece.map(row => row[index])).reverse();
}

// 게임 시작
startGame();
