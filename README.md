# Tic-Tac-Poe

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Walkthrough](#walkthrough)
* [Authors](#authors)
* [Technologies](#technologies)

## Description

Need something to take your mind off of that obnoxious thumping coming from beneath your floor boards? You certainly won't be able to drown out the noise, but maybe a pleasant game of tic-tac-toe can help you keep hold of whatever sanity you have left before the police arrive. And yes, his pale blue eyes were *very scary*, we completely understand.

Tic-Tac-Poe is an Edgar Allen Poe themed version of the classic game "Tic Tac Toe". Two players take turns placing their assigned token on a 3x3 grid in an attempt to have 3 tokens placed consecutively in a diagonal, horizontal, or vertical row. Upon winning, win positions are recorded and displayed within the winning player's win column.

### Notable Features
* Players can only place their token on an empty square
* The starting player cycles at the end of each game
* Wins utilize local storage to persist page refreshes

## Installation
1. Fork this repo
2. Clone down to your machine
3. Access cloned directory
4. Run `index.html`

## Walkthrough
1. When playing the first game, the starting player is always the raven. To place a token, click the desired square.

<p align="center"><img src="https://media.giphy.com/media/zLdLCgCSXIR5PtVaUk/giphy.gif" alt="Player one placing token" width="450" height="auto" style="border-radius:5px"/><br></p>

2. Once a player finishes their turn, the turn indicator will move to the other player's display. Once this happens, they can make their move.

<p align="center"><img src="https://media.giphy.com/media/b67C7ukvWwhw5iflzN/giphy.gif" alt="Player two placing token" width="450" height="auto" style="border-radius:5px"/><br></p>

3. When a win condition is met, "Winner!" is displayed above the display of the player that performed the winning move. A representation of the winning board is recorded and displayed in the winning player's win column.

<p align="center"><img src="https://media.giphy.com/media/kohxuE60KLmjWrREbV/giphy.gif" alt="Win condition met" width="450" height="auto" style="border-radius:5px"/><br></p>

4. If both players manage to place tokens on all 9 squares, the draw condition is met and "Draw!" displays above both player displays.

<p align="center"><img src="https://media.giphy.com/media/pxElqbORoWO7Tu1g5W/giphy.gif" alt="Draw condition met" width="450" height="auto" style="border-radius:5px"/><br></p>

## Authors
<table>
    <tr>
        <td> Jon Schlandt <a href="https://github.com/jon-schlandt">GH</td>
    </tr>
    </tr>
        <td><img src="https://avatars.githubusercontent.com/u/75702270?s=460&u=421bb225c458388a212f290378351ab7e30e5e10&v=4" alt="J. Schlandt" width="125" height="auto" /></td>
    </tr>
</table>

## Technologies
<table>
    <tr>
        <td>Functionality</td>
        <td>Structure</td>
        <td>Styling</td>
    </tr>
    </tr>
        <td><img src="./assets/readme/js-icon.png" alt="javascript" width="100" height="auto" /></td>
        <td><img src="./assets/readme/html-logo.png" alt="html" width="100" height="auto" /></td>
        <td><img src="./assets/readme/css-logo.png" alt="css" width="100" height="auto" /></td>
    </tr>
</table>
