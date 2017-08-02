'use strict';

import Car from './car';

export default class Lane {
    constructor(p5, Obj, speed = 1, xOff = 0, yOff = 0){
        this.p5 = p5;
        this.Obj = Obj;
        this.speed = speed;
        this.xOffset = xOff;
        this.yOffset = yOff;
        this.obstacles = [];
    }

    
    generateCars(n, x = 0, y, w, h, Obj){
        for(let i = 0; i < n; i++){
            this.obstacles[i] = new this.Obj(this.p5, x + (i * this.xOffset), y + this.yOffset, w, h, this.speed);
        }
    }

    show(cb){
        for (let i = 0; i < this.obstacles.length; i++) {
            let obstacle = this.obstacles[i];
            obstacle.show().update();
            cb(obstacle);
        }

        return this;
    }
}