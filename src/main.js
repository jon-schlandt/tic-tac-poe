// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");

var currentPlayerToken = document.getElementById("currentPlayerToken");
var statusMessage = document.getElementById("statusMessage");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    if (event.target !== this) {
        makeMove(event);
        progressGame(event);
    }
});

// Event Handlers/Helper Functions
function makeMove(event) {
    var boardSquare = event.target;
    var squareIndex = boardSquare.id[boardSquare.id.length - 1];
    var token = game.currentPlayer.token;
    
    if (!(game.gameBoard[squareIndex])) {
        game.placeToken(squareIndex, token);
        renderMove(boardSquare, token);
    }
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

    game.changePlayer();
    renderPlayerToken();
}

function completeGame(condition) {
    initiateWin();
    renderStatusMessage(condition);
    game.gamesPlayed++;
    game.changePlayer();

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
    game.saveWin(game.currentPlayer);

    renderWinPositions(renderWinBoard());
    updateWinCount();
}

function renderWinBoard() {
    var winDisplay = document.getElementById(`player${game.currentPlayer.id}Wins`);

    winDisplay.innerHTML += `
        <section class="mini-game-board" id=${game.gamesPlayed}>
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

    return document.getElementById(game.gamesPlayed);
}

function renderWinPositions(winBoard) {
    var boardSquares = winBoard.querySelectorAll(".mini-square");

    for (var i = 0; i < game.gameBoard.length; i++) {
        if (game.gameBoard[i]) {
            boardSquares[i].src = `/assets/${game.gameBoard[i]}-token.png`;
        }
    }
}

function updateWinCount() {
    var countDisplay = document.getElementById(`player${game.currentPlayer.id}WinCount`);
    var winCount = game.currentPlayer.wins.length;

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

    renderPlayerToken();
    statusMessage.innerText = "'s Turn!"
}

function renderPlayerToken() {
    currentPlayerToken.src = `/assets/${game.currentPlayer.token}-token.png`;
}
