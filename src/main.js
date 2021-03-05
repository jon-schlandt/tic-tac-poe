// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");

var currentPlayerToken = document.getElementById("currentPlayerToken");
var statusMessage = document.getElementById("statusMessage");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    if ((event.target !== this) && (event.target.className === "board-square")) {
        makeMove(event);
        progressGame(event);
} });
window.addEventListener("load", renderWinDisplays);

// Event Handlers/Helper Functions
function makeMove(event) {
    var boardSquare = event.target;
    var squareIndex = boardSquare.id[boardSquare.id.length - 1];
    var token = game.currentPlayer.token;

    game.placeToken(squareIndex, token);
    renderMove(boardSquare, token);
}

function renderMove(boardSquare, token) {
    boardSquare.classList.toggle(token);
}

function progressGame() {
    if (game.verifyWin()) {
        completeGame("win");
        return
    }

    if (game.verifyDraw()) {
        completeGame("draw");
        return
    }

    game.setCurrentPlayer();
    updatePlayerToken();
}

function completeGame(condition) {
    initiateWin();
    renderStatusMessage(condition);
    game.setCurrentPlayer();

    setTimeout(function() {
        game.reset();
        initializePlayArea();
    }, 2500);
}

function renderStatusMessage(condition) {
    if (condition === "win") {
        statusMessage.innerText = "wins!";
    } else {
        currentPlayerToken.classList.toggle("hidden");
        statusMessage.innerText = "It's a draw!";
    }
    
}

function initiateWin() {
    game.saveWin();
    game.currentPlayer.saveWinsToStorage();
    updateWinCount(game.currentPlayer);
    renderWinDisplay(game.currentPlayer);
}

function renderWinDisplays() {
    game.playerOne.retrieveWinsFromStorage();
    game.playerTwo.retrieveWinsFromStorage();

    updateWinCount(game.playerOne);
    updateWinCount(game.playerTwo);
    
    renderWinDisplay(game.playerOne);
    renderWinDisplay(game.playerTwo);
}

function renderWinDisplay(player) {
    var winBoards = renderWinBoards(player);

    for (var i = 0; i < winBoards.length; i++) {
        renderWinPositions(winBoards[i], player.wins[i]);
    }
}

function renderWinBoards(player) {
    var winDisplay = document.getElementById(`winDisplay${player.id}`);
    var boards = "";

    for (var i = 0; i < player.wins.length; i++) {
        boards += `
        <section class="mini-game-board">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
            <img class="mini-square">
        </section>
    `
    }
    
    winDisplay.innerHTML = boards;
    return winDisplay.querySelectorAll(".mini-game-board");
}

function renderWinPositions(winBoard, savedWin) {
    var boardSquares = winBoard.querySelectorAll(".mini-square");

    for (var i = 0; i < 9; i++) {
        if (savedWin[i]) {
            boardSquares[i].src = `/assets/${savedWin[i]}-token.png`;
        }
    }
}

function updateWinCount(player) {
    var countDisplay = document.getElementById(`winCount${player.id}`);
    var winCount = player.wins.length;

    if (winCount === 1) {
        countDisplay.innerText = `${winCount} Win`;
    } else {
        countDisplay.innerText = `${winCount} Wins`;
    }
}

function initializePlayArea() {
    initializeGameBoard();
    initializeStatusBox();
}

function initializeGameBoard() {
    var boardSquare;

    for (var i = 0; i < game.gameBoard.length; i++) {
        boardSquare = document.getElementById(`square${i}`);
        boardSquare.className = "board-square";
    }
}

function initializeStatusBox() {
    if (currentPlayerToken.classList.contains("hidden")) {
        currentPlayerToken.classList.toggle("hidden");
    }

    updatePlayerToken();
    statusMessage.innerText = "'s Turn!"
}

function updatePlayerToken() {
    var token = game.currentPlayer.token;

    currentPlayerToken.src = `/assets/${token}-token.png`;
    currentPlayerToken.alt = `${token} token`;
}
