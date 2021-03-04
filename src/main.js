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
    var token = game.currentPlayer.token;
    
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

    game.changePlayer();
    renderTurnToken();
}

function completeGame(condition) {
    renderEndMessage(condition);
    setPlayerWin();
    game.gamesPlayed++;
    game.changePlayer();

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

    renderTurnToken();
    gameMessage.innerText = "'s Turn!"
}

function setPlayerWin() {
    var miniBoard = renderMiniBoard();

    renderWinPositions(miniBoard);
    game.currentPlayer.wins.push(game.gameBoard);
    renderWinCount();
}

function renderMiniBoard() {
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

function renderWinPositions(miniBoard) {
    var miniSquares = miniBoard.querySelectorAll(".mini-square");

    for (var i = 0; i < game.gameBoard.length; i++) {
        if (game.gameBoard[i]) {
            miniSquares[i].src = `/assets/${game.gameBoard[i]}-token.png`;
        }
    }
}

function renderWinCount() {
    var winCountDisplay = document.getElementById(`player${game.currentPlayer.id}WinCount`);
    var winCount = game.currentPlayer.wins.length;

    if (winCount === 1) {
        winCountDisplay.innerText = `${winCount} Win`;
    } else {
        winCountDisplay.innerText = `${winCount} Wins`;
    }
}

function renderTurnToken() {
    turnToken.src = `/assets/${game.currentPlayer.token}-token.png`;
}