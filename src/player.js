/* eslint-disable no-unused-vars */
class Player {
  constructor(id, token) {
    this.id = id;
    this.token = token;
    this.wins = [];
  }

  saveWinsToStorage() {
    window.localStorage.setItem(this.id, window.JSON.stringify(this.wins));
  }

  retrieveWinsFromStorage() {
    const savedWins = window.JSON.parse(window.localStorage.getItem(this.id));
        
    if (savedWins) {
      this.wins = savedWins;
    }
  }
}
