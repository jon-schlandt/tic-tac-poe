// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");

var messageBoxes = document.querySelectorAll(".message-box");
var turnMessages = document.querySelectorAll(".turn-message");

// Event Listeners
gameBoard.addEventListener("click", function(event) { manipulateSquare(event); });
gameBoard.addEventListener("mouseover", function(event) { manipulateSquare(event); });
gameBoard.addEventListener("mouseout", function(event) { manipulateSquare(event) });

window.addEventListener("load", renderWinGrids);

// Event Handlers/Helper Functions
function manipulateSquare(event) {
  var targetClass = event.target.classList;

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
  var boardSquare = event.target.closest("button");
  var squareIndex = boardSquare.id[boardSquare.id.length - 1];
  var token = game.currentPlayer.token;

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
  game.playerOne.retrieveWinsFromStorage();
  game.playerTwo.retrieveWinsFromStorage();

  updateWinCount(game.playerOne);
  updateWinCount(game.playerTwo);
    
  renderWinGrid(game.playerOne);
  renderWinGrid(game.playerTwo);
}

function renderMove(boardSquare, token) {
    var tokenBox = boardSquare.querySelector(".token-box");
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
  var countDisplay = document.getElementById(`countDisplay${player.id}`);
  var winCount = player.wins.length;

  if (winCount === 1) {
    countDisplay.innerText = `${winCount} Win`;
  } else {
    countDisplay.innerText = `${winCount} Wins`;
  }
}

function renderWinGrid(player) {
  var winBoards = renderWinBoards(player);

  for (var i = 0; i < winBoards.length; i++) {
    renderWinPositions(winBoards[i], player.wins[i]);
  }
}

function renderWinBoards(player) {
  var winGrid = document.getElementById(`winGrid${player.id}`);
  var winBoards = "";

  for (var i = 0; i < player.wins.length; i++) {
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
  var boardSquares = winBoard.querySelectorAll(".mini-square");

  for (var i = 0; i < 9; i++) {
    if (savedWin[i]) {
        boardSquares[i].classList.toggle(`${savedWin[i]}-flat`)
    }
  }
}

function renderWinMessage() {
  var turnMessage = document.getElementById(`turnMessage${game.currentPlayer.id}`);
  var endStateMessage = turnMessage.nextElementSibling;

  endStateMessage.innerText = "WINNER!";

  turnMessage.className = "turn-message hidden";
  endStateMessage.className = "end-state-message";
}

function renderDrawMessages() {
  var endStateMessage;

  for (var i = 0; i < messageBoxes.length; i++) {
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
  var boardSquare;
  var tokenBox;

  for (var i = 0; i < game.gameBoard.length; i++) {
    boardSquare = document.getElementById(`square${i}`);
    tokenBox = boardSquare.querySelector(".token-box");

    tokenBox.className = "token-box";
  }
}

function initializeMessageBoxes() {
  var endStateMessage;

  for (var i = 0; i < messageBoxes.length; i++) {
    endStateMessage = turnMessages[i].nextElementSibling;

    endStateMessage.innerText = "";

    endStateMessage.className = "end-state-message";
    turnMessages[i].className = "turn-message";
  }
}

function setTurn() {
  var messageBoxId;
  var playerKey;
    
  for (var i = 0; i < messageBoxes.length; i++) {
    messageBoxId = messageBoxes[i].id;
    playerKey = messageBoxId.slice(messageBoxId.length - 3, messageBoxId.length);

    if (playerKey === game.currentPlayer.id) {
        messageBoxes[i].className = "message-box should-display";
    } else {
        messageBoxes[i].className = "message-box";
    }
  }
}
