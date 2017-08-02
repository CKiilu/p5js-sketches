'use strict';

import Board from './board';

const sketch = (s) => {
    const canvasSize = 400;
    let difficulty = 1;
    let board;
    s.setup = function() {
        s.createCanvas(canvasSize + 1, canvasSize + 1);
        board = new Board(difficulty);
        board.setup(s);
        
        const out = s.select("#output");
        const input = s.createInput(difficulty);
        s.createP("Set your game's difficulty").parent(out);
        s.createP("Default difficulty is 1").parent(out);
        input.attribute("min", 1);
        input.attribute("max", 10);
        input.attribute("type", "number");
        input.parent(out);
        input.changed(function() {
            board = new Board(difficulty = parseInt(this.value()));
            board.setup(s);
            console.log(board.grid.map(g => g.filter(c => c.mine)))
            // s.redraw();
        })
    }
    
    s.draw = function() {
        s.background(255);
        board.draw();
    }

    s.mousePressed = function () {
        board.handleClick(s);
    }
    
};

export default sketch;
