'use strict';

import GameState from './game';

const sketch = (s) => {
    let gameState;
    s.setup = function() {
        s.createCanvas(601, 601);
        gameState = new GameState(s);
    }
    
    s.draw = function() {
        s.background(255);
        
        gameState.show();
    }


    s.mousePressed = function (e) {
        gameState.handleClick(e);
    }
    
};

export default sketch;
