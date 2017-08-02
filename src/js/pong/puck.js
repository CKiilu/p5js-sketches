'use strict';

import Paddle from './paddle';

export default class Puck {
    constructor(p5){
        this.p5 = p5;
        this.r = 12;
        this.reset();
    }

    reset(){
        let angle = this.p5.random(this.p5.PI / 4, this.p5.PI / 4);
        this.x = this.p5.width / 2;
        this.y = this.p5.height / 2;
        
        this.xspeed = 5 * this.p5.cos(angle);
        this.yspeed = 5 * this.p5.sin(angle);

        if(this.p5.random(1) < 0.5){
            this.xspeed *= -1;
        }
    }

    checkPaddleLeft(p){
        if(this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2 && this.x - this.r < p.x + p.w / 2){
            if(this.x > p.x + p.w){
                let diff = this.y - (p.y - p.h / 2);
                let rad = this.p5.radians(45);
                let angle = this.p5.map(diff, 0, p.h, -rad, rad);
                this.xspeed = 5 * this.p5.cos(angle);
                this.yspeed = 5 * this.p5.sin(angle);
            }
        }
        
        return this;
    }
    checkPaddleRight(p){
        if(this.y < p.y + p.h / 2 && this.y > p.y - p.h / 2 && this.x + this.r > p.x - p.w / 2){
            if(this.x < p.x){
                let diff = this.y - (p.y - p.h / 2);
                let rad = this.p5.radians(135);
                let angle = this.p5.map(diff, 0, p.h, -rad, rad);
                this.xspeed = -5 * this.p5.cos(angle);
                this.yspeed = 5 * this.p5.sin(angle);
            }
        }

        return this;
    }

    edges(left, right){
        if(this.y < 0 || this.y > this.p5.height){
            this.yspeed *= -1;
        }
        if(this.x + this.r < 0){
            right++;
            this.reset();
        }
        if(this.x - this.r > this.p5.width){
            left++;
            this.reset();
        }

        return [left,right];
    }

    show(){
        this.p5.fill(255);
        this.p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);

        return this;
    }

    update(){
        this.x += this.xspeed;
        this.y += this.yspeed;

        return this;
    }
}