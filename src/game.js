class Game {
    constructor() {
        this.playerOne = new Player("one", "heart");
        this.playerTwo = new Player("two", "raven");
        this.boardGrid = [
            null, null, null, 
            null, null, null,
            null, null, null
        ]
        this.currentTurn = this.playerOne.id;
    }

    placeToken(cell, token) {
        this.boardGrid.splice(cell, 1, token);
    }

    changeTurn() {
        if (this.currentTurn === "one") {
            this.currentTurn === this.playerTwo;
        } else {
            this.currentTurn === this.playerOne;
        }
    }
    
    verifyWin() {
        if (this.checkRows() || this.checkColumns() || this.checkDiagonals()) {
            return true
        }

        return false;
    }

    verifyDraw() {
        var tokensPlaced = 0;

        for (var i = 0; i < this.boardGrid.length; i++) {
            if (this.boardGrid[i]) {
                tokensPlaced++
            }
        }

        if (tokensPlaced === 9) {
            return true;
        }

        return false;
    }

    saveWin(player) {
        this[player].wins.push(this.boardGrid);
    }

    reset() {
        for (var i = 0; i < this.boardGrid.length; i++) {
            this.boardGrid[i] = null;
        }
    }
    
    checkRows() {
        var row;

        for (var i = 0; i < 9; i += 3) {
            row = this.boardGrid.slice(i, i + 3);
            
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
            column = [this.boardGrid[i], this.boardGrid[i + 3], this.boardGrid[i + 6]]
            
            if (!column[0]) { continue; }

            if ((column[0] === column[1]) && (column[0] === column[2])) {
                return true;
            }
        }

        return false;
    }

    checkDiagonals() {
        var first = [this.boardGrid[0], this.boardGrid[4], this.boardGrid[8]];
        var second = [this.boardGrid[2], this.boardGrid[4], this.boardGrid[6]];
        
        if ((!first[0]) && (!second[0])) {
            return false 
        };

        if ((first[0] === first[1]) && (first[0] === first[2])) {
            return true; 
        }

        if ((second[0] === second[1]) && (second[0] === second[2])) {
            return true; 
        }

        return false;
    }
}
