'use strict';

import Paddle from './paddle';
import Puck from './puck';


export default class GameState{
    constructor(s){        
        this.puck = new Puck(s);
        this.paddleLeft = new Paddle(s, true);
        this.paddleRight = new Paddle(s, false);
        this.p5 = s;
        this.leftScore = 0;
        this.rightScore = 0;
        this.scoreSize = 32;
    }

    draw(){
        
        this.puck.checkPaddleLeft(this.paddleLeft);
        this.puck.checkPaddleRight(this.paddleRight);
        
        this.paddleLeft.show().update();
        this.paddleRight.show().update();

        [this.leftScore, this.rightScore] = this.puck.update().edges(this.leftScore, this.rightScore);
        this.puck.show();

        this.p5.fill(255);
        this.p5.textSize(this.scoreSize);
        this.p5.text(this.leftScore, this.scoreSize, 40);
        this.p5.text(this.rightScore, this.p5.width - this.scoreSize * 2, 40);
    }

    handleKeyPress(e){
        
        const steps = 10;
        if (e.key === 'a') {
            this.paddleLeft.move(-steps);
            
        } else if (e.key === 'd') {
            this.paddleLeft.move(steps);
            
        }
        if (e.key === 'ArrowLeft') {
            this.paddleRight.move(steps);
            
        } else if (e.key === 'ArrowRight') {
            this.paddleRight.move(-steps);
            
        }
        switch (e.key) {
            case 'r':
                this.puck.reset();
                break;
        
            default:
                break;
        }
    }

    handleKeyReleased(){
        this.paddleLeft.move(0);
        this.paddleRight.move(0);
    }
}