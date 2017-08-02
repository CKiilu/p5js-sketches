'use strict';

import GameState from './game';


const sketch = (s) => {
    let gameState;
    s.setup = function() {
        s.createCanvas(600, 400);
        gameState = new GameState(s);
        s.select("#output").html(`
            <h2>Pong</h2>
            <p>
                Control left paddle using "a" and "d".
                Control right paddle using left and right arrow keys.
            </p>
            <p>
                Reset puck by pressing "r".
            </p>
        `) 
    }
    
    s.draw = function() {
        s.background(0);
        gameState.draw();
    }
    
    s.keyPressed = function(e) {
        gameState.handleKeyPress(e);
    };

    s.keyReleased = function (e) {
        gameState.handleKeyReleased(e);
    }
};

export default sketch;