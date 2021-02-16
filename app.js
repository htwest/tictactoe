// Initial Game State

let currentPlayer = "X";
let currentGame = ['','','','','','','','',''];
const winningCombos = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6]
]

// Game Functionality

function onCellClick(e) {
  let clickedCell = e.target;
  if (clickedCell.innerHTML === '') {
    clickedCell.innerHTML = currentPlayer;
    updateGame(clickedCell);
    checkForWin();
    checkForDraw();
    playerChange();
  }
}

function playerChange() {
  currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
}

function updateGame(clickedCell) {
  let cellIndex = clickedCell.getAttribute('data-cell-index');
  currentGame[cellIndex] = currentPlayer;
}

// Win or Draw Validation

function checkForWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    // Check for mark at specific index's, comparing their placements to the possible winning combos
    const winState = winningCombos[i];
    let firstMark = currentGame[winState[0]];
    let secondMark = currentGame[winState[1]];
    let thirdMark = currentGame[winState[2]];
    // Check for any blanks
    if (firstMark === '' || secondMark === '' || thirdMark === '') {
      continue;
    }
    // Check if all marks are the same type
    if (firstMark === secondMark && firstMark === thirdMark) {
      gameWon();
    }
  }
}

function checkForDraw() {
  let filledBoard = true;
  for (let i = 0; i < currentGame.length; i++) {
    if (currentGame[i] === '') {
      filledBoard = false;
    }
  }
  if (filledBoard) {
    document.querySelector('.end-message').innerHTML = 'DRAW!'
  }
}

function gameWon() {
  document.querySelector('.end-message').innerHTML = currentPlayer + ' WON!!'
}


// Restart Game
function gameReset() {
  console.log('Works')
  currentPlayer = "X";
  currentGame = ['','','','','','','','',''];
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.innerHTML = '';
  })
  document.querySelector('.end-message').innerHTML = '';
}


// Event Listeners

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', onCellClick)
});

document.querySelector('.restart-button').addEventListener('click', gameReset);