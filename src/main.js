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
const manipulateSquare = event => {
  const targetClass = event.target.classList;
  const targetIsTokenBox = targetClass.contains("token-box");
  const targetIsNotEmpty = (
    targetClass.contains("raven") || targetClass.contains("heart")
  );

  if (game.inEndState || !targetIsTokenBox || targetIsNotEmpty) {
    return;
  }

  if (event.type === "click") { 
    makeMove(event);
    progressGame();
  } else {
    toggleTokenPreview(event);
  }
}

const makeMove = event => {
  const boardSquare = event.target.closest("button");
  const squareIndex = boardSquare.id[boardSquare.id.length - 1];
  const token = game.currentPlayer.token;

  game.placeToken(squareIndex, token);
  renderMove(boardSquare, token);
}

const progressGame = () => {
  if (game.verifyWin()) {
    completeGame("win");
  } else if (game.verifyDraw()) {
    completeGame("draw");
  } else {
    game.setCurrentPlayer();
    setTurn();
  }
}

const toggleTokenPreview = event => {
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

const renderMove = (boardSquare, token) => {
  const tokenBox = boardSquare.querySelector(".token-box");
  tokenBox.className = `token-box ${token}`
}

const completeGame = condition => {
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

const initiateWin = () => {
  game.saveWin();
  game.currentPlayer.saveWinsToStorage();

  updateWinCount(game.currentPlayer);
  renderWinGrid(game.currentPlayer);
}

const updateWinCount = player => {
  const countDisplay = document.getElementById(`countDisplay${player.id}`);
  const winCount = player.wins.length;

  if (winCount === 1) {
    countDisplay.innerText = `${winCount} Win`;
  } else {
    countDisplay.innerText = `${winCount} Wins`;
  }
}

const renderWinGrid = player => {
  const winGrid = document.getElementById(`winGrid${player.id}`);
  const playerWins = player.wins;

  initializeWinGrid(winGrid);

  playerWins.forEach(win => {
    winGrid.innerHTML += "<article class='mini-game-board'></article>";
    renderWinBoard(winGrid, win);
  })
}

const initializeWinGrid = winGrid => winGrid.innerHTML = "";

const renderWinBoard = (winGrid, win) => {
  const winBoard = winGrid.lastElementChild;

  win.map(position => { 
    const miniSquare = winBoard.appendChild(document.createElement("div"));

    if (win) {
      miniSquare.className = `mini-square ${position}`;
    }
  });
}

const renderWinMessage = () => {
  const turnMessage = document.getElementById(
    `turnMessage${game.currentPlayer.id}`
  );
  const endStateMessage = turnMessage.nextElementSibling;

  turnMessage.className = "turn-message hidden";
  endStateMessage.innerText = "WINNER!";
  endStateMessage.className = "end-state-message";
}

const renderDrawMessages = () => {
  turnMessages.forEach(message => {
    let endStateMessage = message.nextElementSibling;
  
    message.className = "turn-message hidden";
    endStateMessage.innerText = "DRAW!";
    endStateMessage.className = "end-state-message";
  })
  
  messageBoxes.forEach(box => {
    box.className = "message-box should-display";
  })
}

const initializeGame = () => {
  clearGameBoard();
  initializeMessageBoxes();
  setTurn();
}

const clearGameBoard = () => {
  const tokenBoxes = document.querySelectorAll(".token-box");
  tokenBoxes.forEach(box => box.className = "token-box");
}

const initializeMessageBoxes = () => {
  turnMessages.forEach(message => {
    let endStateMessage = message.nextElementSibling;

    message.className = "turn-message";
    endStateMessage.innerText = "";
    endStateMessage.className = "end-state-message hidden";
  })
}

const setTurn = () => {
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
  })
}
