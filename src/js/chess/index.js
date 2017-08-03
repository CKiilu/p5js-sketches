'use strict';

import GameState from './game';

const sketch = (s) => {
    let gameState, player1, player2;
    const playerState = (p) => (`
        <h2> ${p.name} : Score - ${p.score}</h2>
        <p>${p.piecesCaptured.join(",")}</p>
    `);

    s.setup = function() {
        s.createCanvas(601, 601);
        gameState = new GameState(s);

        let out = s.select("#output");
        let scoreBoard = s.createDiv("");
        let container = s.select("#sketchContainer");
        let canvas =  s.select("#defaultCanvas0")
        canvas.style("display", "inline-block")
        scoreBoard.style("display", "inline-block")
        scoreBoard.style("vertical-align", "top")
        scoreBoard.style("height", s.height + "px")
        scoreBoard.parent(container);
        player1 = s.createDiv("")
        player2 = s.createDiv("")
        player1.parent(scoreBoard);
        player2.parent(scoreBoard);
        player1.style("height", s.height / 2 + "px")
        player2.style("height", s.height / 2 + "px")

        out.html("Play chess")
    }
    
    s.draw = function() {
        s.background(255);
        gameState.show();


        player1.html(playerState(gameState.getPlayer1));
        player2.html(playerState(gameState.getPlayer2));
    }


    s.mousePressed = function (e) {
        gameState.handleClick(e);
    }
    
};

export default sketch;
