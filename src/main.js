// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    makeMove(event);
    progressGame(event); });

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
        alert("Draw!");
        game.reset();
        initializeBoard();
    }

    if (game.verifyWin()) {
        alert("Win!");
        game.reset();
        initializeBoard();
    }

    game.changeTurn();
}

function initializeBoard() {

}