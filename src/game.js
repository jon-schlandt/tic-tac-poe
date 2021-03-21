/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class Game {
  constructor() {
    this.playerOne = new Player("One", "raven");
    this.playerTwo = new Player("Two", "heart");
    this.startingPlayer = this.playerOne;
    this.currentPlayer = this.startingPlayer;
    this.inEndState = false;
    this.gameBoard = [
      null, null, null, 
      null, null, null,
      null, null, null
    ];
    this.winStates = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  }

  placeToken(squareIndex) {
    this.gameBoard.splice(squareIndex, 1, this.currentPlayer.token);
  }

  verifyWin() {
    let boardComp;
    let firstEqualsSecond;
    let firstEqualsLast;
    let isWin = false;

    this.winStates.forEach(state => {
      boardComp = this.gameBoard.filter(
        (square, index) => state.includes(index)
      );
      firstEqualsSecond = boardComp[0] === boardComp[1];
      firstEqualsLast = boardComp[0] === boardComp[2];

      if (boardComp[0] && firstEqualsSecond && firstEqualsLast) {
        isWin = true;
      }
    })

    return isWin;
  }

  verifyDraw() {
    return this.gameBoard.every(square => square);
  }
    
  setStartingPlayer() {
    if (this.startingPlayer === this.playerOne) {
      this.startingPlayer = this.playerTwo;
    } else {
      this.startingPlayer = this.playerOne;
    }

    this.currentPlayer = this.startingPlayer;
  }
    
  setCurrentPlayer() {
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
    } else {
      this.currentPlayer = this.playerOne;
    }
  }

  toggleEndState() {
    this.inEndState = !this.inEndState;
  } 
    
  saveWin() {
    const savedBoard = this.gameBoard.slice(0, 9);
    this.currentPlayer.wins.push(savedBoard);
  }

  reset() {
    this.setStartingPlayer();
    this.gameBoard.forEach(square => square = null);
  }
}
