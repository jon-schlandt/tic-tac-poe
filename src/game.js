class Game {
    constructor() {
        this.playerOne = new Player("One", "raven");
        this.playerTwo = new Player("Two", "heart");
        this.gameBoard = [
            null, null, null, 
            null, null, null,
            null, null, null
        ]
        this.currentPlayer = this.playerOne;
        this.gamesPlayed = 0;
    }

    placeToken(squareIndex, token) {
        this.gameBoard.splice(squareIndex, 1, token);
    }

    verifyWin() {
        if (this.checkRows() || this.checkColumns() || this.checkDiagonals()) {
            return true
        }

        return false;
    }

    checkRows() {
        var row;

        for (var i = 0; i < 9; i += 3) {
            row = this.gameBoard.slice(i, i + 3);
            
            if (!row[0]) { continue; }

            if ((row[0] === row[1]) && (row[0] === row[2])) {
                return true;
            }
        }

        return false;
    }

    checkColumns() {
        var column;

        for (var i = 0; i < 3; i++) {
            column = [this.gameBoard[i], this.gameBoard[i + 3], this.gameBoard[i + 6]]
            
            if (!column[0]) { continue; }

            if ((column[0] === column[1]) && (column[0] === column[2])) {
                return true;
            }
        }

        return false;
    }

    checkDiagonals() {
        var first = [this.gameBoard[0], this.gameBoard[4], this.gameBoard[8]];
        var second = [this.gameBoard[2], this.gameBoard[4], this.gameBoard[6]];

        if ((first[0]) && (first[0] === first[1]) && (first[0] === first[2])) {
            return true; 
        }

        if ((second[0]) && (second[0] === second[1]) && (second[0] === second[2])) {
            return true; 
        }

        return false;
    }

    verifyDraw() {
        var tokensPlaced = 0;

        for (var i = 0; i < this.gameBoard.length; i++) {
            if (this.gameBoard[i]) {
                tokensPlaced++
            }
        }

        if (tokensPlaced === 9) {
            return true;
        }

        return false;
    }

    changePlayer() {
        if (this.currentPlayer.id === this.playerOne.id) {
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer = this.playerOne;
        }
    }
    
    saveWin() {
        this.currentPlayer.wins.push(this.gameBoard);
    }

    reset() {
        for (var i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i] = null;
        }
    }
}
