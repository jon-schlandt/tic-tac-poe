// Dependents
const game = new Game();
const players = [game.playerOne, game.playerTwo];

// Query Selectors
const gameBoard = document.getElementById("gameBoard");

const messageBoxes = document.querySelectorAll(".message-box");
const turnMessages = document.querySelectorAll(".turn-message");

// Event Listeners
gameBoard.addEventListener("click", function(event) { 
  manipulateSquare(event); 
});
gameBoard.addEventListener("mouseover", function(event) { 
  manipulateSquare(event); 
});
gameBoard.addEventListener("mouseout", function(event) { 
  manipulateSquare(event); 
});

window.addEventListener("load", renderWinGrids);

// Event Handlers/Helper Functions
function manipulateSquare(event) {
  const targetClass = event.target.classList;

  if (game.inEndState || !(targetClass.contains("token-box")) || targetClass.contains("raven") || targetClass.contains("heart")) {
      return;
  }

  if (event.type === "click") { 
    makeMove(event);
    progressGame();
  } else {
    toggleTokenPreview(event);
  }
}

function makeMove(event) {
  const boardSquare = event.target.closest("button");
  const squareIndex = boardSquare.id[boardSquare.id.length - 1];
  const token = game.currentPlayer.token;

  game.placeToken(squareIndex, token);
  renderMove(boardSquare, token);
}

function progressGame() {
  if (game.verifyWin()) {
    completeGame("win");
  } else if (game.verifyDraw()) {
    completeGame("draw");
  } else {
    game.setCurrentPlayer();
    setTurn();
  }
}

function toggleTokenPreview(event) {
  if (event.type === "mouseout" && event.target.className === "token-box") {
    return;
  } else {
    event.target.classList.toggle(`${game.currentPlayer.token}-preview`);
  }
}

function renderWinGrids() {
  players.forEach(player => {
    player.retrieveWinsFromStorage();
    updateWinCount(player);
    renderWinGrid(player);
  });
}

function renderMove(boardSquare, token) {
  const tokenBox = boardSquare.querySelector(".token-box");
  tokenBox.className = `token-box ${token}`
}

function completeGame(condition) {
  if (condition === "win") {
    initiateWin();
    renderWinMessage();
  } else if (condition === "draw") {
    renderDrawMessages();
  }

  game.toggleEndState();

  setTimeout(function() {
    game.reset();
    initializeGame();
    game.toggleEndState();
  }, 2500);
}

function initiateWin() {
  game.saveWin();
  game.currentPlayer.saveWinsToStorage();

  updateWinCount(game.currentPlayer);
  renderWinGrid(game.currentPlayer);
}

function updateWinCount(player) {
  const countDisplay = document.getElementById(`countDisplay${player.id}`);
  const winCount = player.wins.length;

  if (winCount === 1) {
    countDisplay.innerText = `${winCount} Win`;
  } else {
    countDisplay.innerText = `${winCount} Wins`;
  }
}

function renderWinGrid(player) {
  const winBoards = renderWinBoards(player);

  for (let i = 0; i < winBoards.length; i++) {
    renderWinPositions(winBoards[i], player.wins[i]);
  }
}

function renderWinBoards(player) {
  const winGrid = document.getElementById(`winGrid${player.id}`);
  let winBoards = "";

  for (let i = 0; i < player.wins.length; i++) {
    winBoards += `
      <article class="mini-game-board">
        <div class="mini-square right-bottom-border"></div>
        <div class="mini-square right-bottom-border"></div>
        <div class="mini-square bottom-border"></div>
        <div class="mini-square right-bottom-border"></div>
        <div class="mini-square right-bottom-border"></div>
        <div class="mini-square bottom-border"></div>
        <div class="mini-square right-border"></div>
        <div class="mini-square right-border"></div>
        <div class="mini-square no-border"></div>
      </article>
    `
  }
    
  winGrid.innerHTML = winBoards;
  return winGrid.querySelectorAll(".mini-game-board");
}

function renderWinPositions(winBoard, savedWin) {
  const boardSquares = winBoard.querySelectorAll(".mini-square");

  for (let i = 0; i < 9; i++) {
    if (savedWin[i]) {
      boardSquares[i].classList.toggle(`${savedWin[i]}-flat`)
    }
  }
}

function renderWinMessage() {
  const turnMessage = document.getElementById(
    `turnMessage${game.currentPlayer.id}`);
  const endStateMessage = turnMessage.nextElementSibling;

  endStateMessage.innerText = "WINNER!";

  turnMessage.className = "turn-message hidden";
  endStateMessage.className = "end-state-message";
}

function renderDrawMessages() {
  let endStateMessage;

  for (let i = 0; i < messageBoxes.length; i++) {
    endStateMessage = turnMessages[i].nextElementSibling;

    endStateMessage.innerText = "DRAW!";

    messageBoxes[i].className = "message-box should-display";
    turnMessages[i].className = "turn-message hidden";
    endStateMessage.className = "end-state-message";
  }
}

function initializeGame() {
  clearGameBoard();
  initializeMessageBoxes();
  setTurn();
}

function clearGameBoard() {
  let boardSquare;
  let tokenBox;

  for (let i = 0; i < game.gameBoard.length; i++) {
    boardSquare = document.getElementById(`square${i}`);
    tokenBox = boardSquare.querySelector(".token-box");

    tokenBox.className = "token-box";
  }
}

function initializeMessageBoxes() {
  let endStateMessage;

  for (let i = 0; i < messageBoxes.length; i++) {
    endStateMessage = turnMessages[i].nextElementSibling;

    endStateMessage.innerText = "";

    endStateMessage.className = "end-state-message hidden";
    turnMessages[i].className = "turn-message";
  }
}

function setTurn() {
  let messageBoxId;
  let playerKey;
    
  for (let i = 0; i < messageBoxes.length; i++) {
    messageBoxId = messageBoxes[i].id;
    playerKey = messageBoxId.slice(
      messageBoxId.length - 3, messageBoxId.length);

    if (playerKey === game.currentPlayer.id) {
      messageBoxes[i].className = "message-box should-display";
    } else {
      messageBoxes[i].className = "message-box";
    }
  }
}
