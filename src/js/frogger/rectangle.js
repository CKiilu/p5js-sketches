'use strict';

export default class Rectangle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    get left(){
        return this.x;
    }
    get right(){
        return this.x + this.w;
    }
    get top(){
        return this.y;
    }
    get bottom(){
        return this.y + this.h;
    }
    intersects(other){
        return !(
            this.left >= other.right || this.right <= other.left ||
            this.top >= other.bottom || this.bottom <= other.top
        )
    }
}