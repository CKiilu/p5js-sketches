'use strict';

import Rectangle from './rectangle';

export default class Car extends Rectangle {
    constructor(p5, x, y, w, h, s = 2){
        super(x, y, w, h);
        this.p5 = p5;
        this.speed = s;
    }

    show(){
        this.p5.fill(200);
        this.p5.rect(this.x, this.y, this.w, this.h);

        return this;
    }

    update(){
        this.x += this.speed;
        if(this.speed > 0 && this.x > this.p5.width + this.w){
            this.x = -this.w;
        } else if (this.speed < 0 && this.x < -this.w){
            this.x = this.p5.width + this.w;
        }

        return this;
    }
}