var Player = require('./player.js');

class Game {
    constructor() {
        this.playerOne = new Player("one", "heart");
        this.playerTwo = new Player("two", "raven");
        // this.boardGrid = [
        //     { cell1: "" }, { cell2: "" }, { cell3: "" },
        //     { cell4: "" }, { cell5: "" }, { cell6: "" },
        //     { cell7: "" }, { cell8: "" }, { cell9: "" } 
        // ]
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
    
    verifyWin() {

    }

    verifyDraw() {

    }

    checkRows() {
        var currentGrid = this.boardGrid;
        var row;

        for (var i = 0; i < 3; i++) {
            row = currentGrid.splice(0, 3);
            console.log(row);
            
            if ((row[0] === null) && ((row[0] === row[1]) && (row[0] === row[2]))) {
                continue;
            }

            if ((row[0] === row[1]) && (row[0] === row[2])) {
                return true;
            }
        }

        return false;
    }

    checkColumns() {

    }

    checkDiagonals() {

    }

    saveWin() {

    }

    reset() {

    }
}

var game = new Game();
game.placeToken(2, game.playerOne.token);
game.placeToken(5, game.playerOne.token);
game.placeToken(8, game.playerOne.token);

console.log(game.checkRows());
