'use strict';

import GameState from './game';

const sketch = (s) => {
    let gameState;
    s.setup = function() {
        s.createCanvas(600, 400);
        gameState = new GameState(s);
    }
    
    s.draw = function() {
        s.background(41);

        s.fill(255,100);
        s.rect(0, 0, s.width, gameState.gridSize);
        s.rect(0, s.height - gameState.gridSize, s.width, gameState.gridSize);
        s.rect(0, s.height - gameState.gridSize * (gameState.lanes.length + 2), s.width, gameState.gridSize);

        gameState.show();


    }

    s.keyPressed = function(e){
        gameState.handleKeyPress(e);
    }
    
};

export default sketch;
