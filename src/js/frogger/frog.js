'use strict';

import Rectangle from './rectangle';

export default class Frog extends Rectangle {
    constructor(p5, x, y, w){
        super(x, y, w, w);
        this.p5 = p5;
    }

    show(){
        this.p5.fill(255);
        this.p5.rect(this.x, this.y, this.w, this.w);

        return this;
    }

    constrain(){
        this.x = this.p5.constrain(this.x, 0, this.p5.width - this.w);
        this.y = this.p5.constrain(this.y, 0, this.p5.height - this.h);

        return this;
    }

    move(xDir, yDir){
        this.x += xDir * this.w;
        this.y += yDir * this.w;

        this.constrain();

        return this;
    }
}