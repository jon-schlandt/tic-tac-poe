// eslint-disable-next-line no-unused-vars
class Game {
  constructor() {
    // eslint-disable-next-line no-undef
    this.playerOne = new Player("One", "raven");
    // eslint-disable-next-line no-undef
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

  placeToken(squareIndex, token) {
    this.gameBoard.splice(squareIndex, 1, token);
  }

  verifyWin() {
    let winState;
    let firstEqualsSecond;
    let firstEqualsLast;

    for (let i = 0; i < this.winStates.length; i++) {
      winState = this.winStates[i];
      firstEqualsSecond = this.gameBoard[winState[0]] === this.gameBoard[winState[1]];
      firstEqualsLast = this.gameBoard[winState[0]] === this.gameBoard[winState[2]];

      if (this.gameBoard[winState[0]] === null) {
        continue;
      }

      if (firstEqualsSecond && firstEqualsLast) {
        return true;
      }
    }
  }

 verifyDraw() {
    const boardState = this.gameBoard.filter(square => square);
    
    if (boardState.length === 9) {
      return true;
    }
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

    for (let i = 0; i < this.gameBoard.length; i++) {
      this.gameBoard[i] = null;
    }
  }
}
