// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");
var turnToken = document.getElementById("turnToken");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    makeMove(event);
    progressGame(event); 
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
    if (game.verifyDraw()) {
        completeGame("draw");
        return
    }

    if (game.verifyWin()) {
        completeGame("win");
        return
    }

    game.changeTurn();
    renderTurn();
}

function completeGame(condition) {
    alert(condition);
    game.reset();
    initializeBoard();
}

function initializeBoard() {
    var square;

    for (var i = 0; i < game.gameBoard.length; i++) {
        square = document.getElementById(`square${i}`);
        square.className = "board-square";
    }

    turnToken.src = "assets/raven-token.png";
}

function renderTurn() {
    turnToken.src = `/assets/${game.currentTurn.token}-token.png`;
}