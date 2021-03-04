// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");
var turnToken = document.getElementById("turnToken");
var gameMessage = document.getElementById("game-message");
var playerOneWins = document.getElementById("playerOneWins");
var playerTwoWins = document.getElementById("playerTwoWins");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    if (event.target !== this) {
        makeMove(event);
        progressGame(event);
    }
});

// Event Handlers/Helper Functions
function makeMove(event) {
    var square = event.target;
    var squareIndex = square.id[square.id.length - 1];
    var token = game.currentTurn.token;
    
    if (!game.gameBoard[squareIndex]) {
        game.placeToken(squareIndex, token);
        renderMove(square, token);
    }
}

function renderMove(square, token) {
    square.classList.toggle(token);
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

    game.changeTurn();
    renderTurnToken();
}

function completeGame(condition) {
    renderEndMessage(condition);
    renderPlayerWin();
    game.gamesPlayed++;

    setTimeout(function() {
        game.reset();
        initializePlayArea();
    }, 2500);
}

function renderEndMessage(condition) {
    if (condition === "win") {
        gameMessage.innerText = "wins!";
    } else {
        turnToken.classList.toggle("hidden");
        gameMessage.innerText = "It's a draw!";
    }
    
}

function initializePlayArea() {
    initializeGameBoard();
    initializeMessageBox();
}

function initializeGameBoard() {
    var square;

    for (var i = 0; i < game.gameBoard.length; i++) {
        square = document.getElementById(`square${i}`);
        square.className = "board-square";
    }
}

function initializeMessageBox() {
    if (turnToken.classList.contains("hidden")) {
        turnToken.classList.toggle("hidden");
    }

    if (!(game.gamesPlayed % 2 === 0) || (game.gamesPlayed === 1)) {
        turnToken.src = "assets/heart-token.png";
    } else {
        turnToken.src = "assets/raven-token.png";
    }

    gameMessage.innerText = "'s Turn!"
}

function setPlayerWin() {
    var miniBoard = renderMiniBoard();

    renderWinPositions(miniBoard);

}

function renderMiniBoard() {
    var winDisplay = document.getElementById(`player${game.currentTurn.id}Wins`);
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

function renderWinPositions(miniBoard) {
    var miniSquares = miniBoard.querySelectorAll(".mini-square");

    for (var i = 0; i < game.gameBoard.length; i++) {
        if (game.gameBoard[i]) {
            miniSquares[i].src = `/assets/${game.gameBoard[i]}-token.png`;
        }
    }
}

function renderTurnToken() {
    turnToken.src = `/assets/${game.currentTurn.token}-token.png`;
}