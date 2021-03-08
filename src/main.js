// Dependents
var game = new Game();

// Query Selectors
var gameBoard = document.getElementById("gameBoard");
var indicatorBoxes = document.querySelectorAll(".indicator-box");
var statusMessages = document.querySelectorAll(".status-message");
var clearStorageButton = document.querySelector(".clear");

// Event Listeners
gameBoard.addEventListener("click", function(event) {
    if ((event.target !== this) && (event.target.className === ("token-container"))) {
        makeMove(event);
        progressGame(event);
        
} });
window.addEventListener("load", renderWinDisplays);
clearStorageButton.addEventListener("click", clearStorage);

// Event Handlers/Helper Functions
function makeMove(event) {
    var boardSquare = event.target.closest("button");
    var squareIndex = boardSquare.id[boardSquare.id.length - 1];
    var token = game.currentPlayer.token;

    game.placeToken(squareIndex, token);
    renderMove(boardSquare, token);
}

function renderMove(boardSquare, token) {
    var tokenContainer = boardSquare.querySelector("span");
    tokenContainer.classList.toggle(`${token}`);
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

function completeGame(condition) {
    if (condition === "win") {
        initiateWin();
        renderWinMessage();
    } else if (condition === "draw") {
        renderDrawMessage();
    }
    
    setTimeout(function() {
        game.reset();
        initializeGame();
    }, 2000);
}

function initiateWin() {
    game.saveWin();
    game.currentPlayer.saveWinsToStorage();

    updateWinCount(game.currentPlayer);
    renderWinDisplay(game.currentPlayer);
}

function renderWinMessage() {
    var indicatorBox = document.getElementById(`indicatorBox${game.currentPlayer.id}`);
    var statusMessage = document.getElementById(`statusMessage${game.currentPlayer.id}`);

    indicatorBox.lastElementChild.classList.toggle("hidden");
    statusMessage.lastElementChild.classList.toggle("hidden");
    
    indicatorBox.classList.toggle("condition-met");
    statusMessage.firstElementChild.innerText = "WINNER!";    
}

function renderDrawMessage() {
    for (var i = 0; i < indicatorBoxes.length; i++) {
        if (!(indicatorBoxes[i].classList.contains("should-display"))) {
            indicatorBoxes[i].classList.toggle("should-display");
        }

        indicatorBoxes[i].lastElementChild.classList.toggle("hidden");
        statusMessages[i].lastElementChild.classList.toggle("hidden");

        indicatorBoxes[i].classList.toggle("condition-met");
        statusMessages[i].firstElementChild.innerText = "DRAW!";
        }
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
            <div class="mini-square right-bottom-border"></div>
            <div class="mini-square right-bottom-border"></div>
            <div class="mini-square bottom-border"></div>
            <div class="mini-square right-bottom-border"></div>
            <div class="mini-square right-bottom-border"></div>
            <div class="mini-square bottom-border"></div>
            <div class="mini-square right-border"></div>
            <div class="mini-square right-border"></div>
            <div class="mini-square"></div>
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
            boardSquares[i].classList.toggle(`${savedWin[i]}`)
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

function initializeGame() {
    clearGameBoard();
    initializeIndicatorBoxes();
    setTurn();
}

function clearGameBoard() {
    var boardSquare;
    var token;

    for (var i = 0; i < game.gameBoard.length; i++) {
        boardSquare = document.getElementById(`square${i}`);
        token = boardSquare.querySelector("span");
        
        if (token.classList.contains("raven")) {
            token.classList.toggle("raven");
        } else if (token.classList.contains("heart")) {
            token.classList.toggle("heart");
        }
    }
}

function initializeIndicatorBoxes() {
    var indicatorArrow;
    var firstStatusLine;
    var secondStatusLine;

    for (var i = 0; i < indicatorBoxes.length; i++) {
        indicatorArrow = indicatorBoxes[i].querySelector(".indicator-arrow");
        firstStatusLine = statusMessages[i].firstElementChild;
        secondStatusLine = statusMessages[i].lastElementChild;

        indicatorArrow.className = "indicator-arrow";
        secondStatusLine.removeAttribute("class");

        firstStatusLine.innerText = "YOUR";
    }
}

function setTurn() {
    var indicatorBoxId;
    var playerKey;
    
    for (var i = 0; i < indicatorBoxes.length; i++) {
        indicatorBoxId = indicatorBoxes[i].id;
        playerKey = indicatorBoxId.slice(indicatorBoxId.length - 3, indicatorBoxId.length);

        if (playerKey === game.currentPlayer.id) {
            indicatorBoxes[i].className = "indicator-box should-display";
        } else {
            indicatorBoxes[i].className = "indicator-box";
        }
    }
}

function clearStorage() {
    window.localStorage.clear();
}
