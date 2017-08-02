'use strict';

import Car from './car';

export default class Log extends Car{
    constructor(p5, x, y, w, h, s){
        super(p5, x, y + h / 4, w, h / 2, s);
    }

    get bottom(){
        return this.y +  this.h * 1.5;
    }
    get top(){
        return this.y -  this.h /2;
    }
    
    intersects(other){
        return !(
            this.left >= other.right || this.right <= other.left ||
            this.top >= other.bottom || this.bottom  <= other.top
        )
    }
}