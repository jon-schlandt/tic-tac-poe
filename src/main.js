/* eslint-disable no-undef */
// Dependents
const game = new Game();
const players = [game.playerOne, game.playerTwo];

// Query Selectors
const gameBoard = document.getElementById("gameBoard");

const messageBoxes = document.querySelectorAll(".message-box");
const turnMessages = document.querySelectorAll(".turn-message");

// Event Listeners
gameBoard.addEventListener("click", (event) => manipulateSquare(event));
gameBoard.addEventListener("mouseover", (event) => manipulateSquare(event));
gameBoard.addEventListener("mouseout", (event) => manipulateSquare(event));

window.addEventListener("load", renderWinGrids);

// Event Handlers/Helper Functions
function manipulateSquare(event) {
  const targetClass = event.target.classList;
  const targetNotSquare = !targetClass.contains("board-square");
  const targetIsNotEmpty = (
    targetClass.contains("raven") || targetClass.contains("heart")
  );

  if (game.inEndState || targetNotSquare || targetIsNotEmpty) {
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
  const squareIndex = event.target.id[event.target.id.length - 1];

  game.placeToken(squareIndex);
  renderMove(event.target);
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
  if (event.type === "mouseout" && event.target.className === "board-square") {
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

function renderMove(boardSquare) {
  boardSquare.classList.toggle(`${game.currentPlayer.token}-preview`);
  boardSquare.classList.toggle(game.currentPlayer.token);
}

function completeGame(condition) {
  if (condition === "win") {
    initiateWin();
    renderWinMessage();
  } else if (condition === "draw") {
    renderDrawMessages();
  }

  game.toggleEndState();

  setTimeout(function () {
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
  const winGrid = document.getElementById(`winGrid${player.id}`);
  const playerWins = player.wins;

  initializeWinGrid(winGrid);

  playerWins.forEach(win => {
    winGrid.innerHTML += "<article class='mini-game-board'></article>";
    renderWinBoard(winGrid, win);
  });
}

function initializeWinGrid(winGrid) {
  winGrid.innerHTML = "";
}

function renderWinBoard(winGrid, win) {
  const winBoard = winGrid.lastElementChild;

  win.map(token => {
    const miniSquare = winBoard.appendChild(document.createElement("div"));
    miniSquare.className = "mini-square";

    if (token) {
      miniSquare.classList.toggle(token);
    }
  });
}

function renderWinMessage() {
  const turnMessage = document.getElementById(
    `turnMessage${game.currentPlayer.id}`
  );
  const endStateMessage = turnMessage.nextElementSibling;

  endStateMessage.innerText = "WINNER!";
  toggleMessages(turnMessage, endStateMessage)
}

function renderDrawMessages() {
  turnMessages.forEach(turnMessage => {
    let endStateMessage = turnMessage.nextElementSibling;

    endStateMessage.innerText = "DRAW!";
    toggleMessages(turnMessage, endStateMessage);
  });

  messageBoxes.forEach(box => {
    box.className = "message-box should-display";
  });
}

function toggleMessages(turnMsg, endStateMsg) {
  turnMsg.classList.toggle("hidden");
  endStateMsg.classList.toggle("hidden");
}

function initializeGame() {
  clearGameBoard();
  initializeMessageBoxes();
  setTurn();
}

function clearGameBoard() {
  const boardSquares = document.querySelectorAll(".board-square");

  boardSquares.forEach(box => {
    if (box.classList.contains("raven")) {
      box.classList.toggle("raven");
    } else if (box.classList.contains("heart")) {
      box.classList.toggle("heart");
    }
  }) 
}

function initializeMessageBoxes() {
  let endStateMessage;
  
  turnMessages.forEach(turnMessage => {
    endStateMessage = turnMessage.nextElementSibling;

    endStateMessage.innerText = "";
    initializeMessages(turnMessage, endStateMessage);
  });
}

function initializeMessages(turnMsg, endStateMsg) {
  turnMsg.className = "turn-message";
  endStateMsg.className = "end-state-message hidden";
}

function setTurn() {
  let messageBoxId;
  let playerKey;

  messageBoxes.forEach(box => {
    messageBoxId = box.id;
    playerKey = messageBoxId.slice(
      messageBoxId.length - 3, messageBoxId.length
    );

    if (playerKey === game.currentPlayer.id) {
      box.className = "message-box should-display";
    } else {
      box.className = "message-box";
    }
  });
}
