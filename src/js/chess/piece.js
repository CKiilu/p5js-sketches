'use strict';

import {_find2DArrayNeighbours, _loop2DArray} from '../shared';

export default class Piece{
    constructor(p5, type, indexes, w, c, side){
        this.p5 = p5;
        this.type = type;
        this.w = w;
        this.half = w / 2;
        this.selected = false;
        this.color = c;
        this.side = side;
        this.indexes = indexes;
        this.moves = [];
    }

    redraw({col, row}){
        this.indexes = {col,row};
        console.log(this.indexes)
    }

    get x(){
        return (this.indexes.col + 1) * this.w - this.w / 2;
    }

    get y(){
        return (this.indexes.row + 1) * this.w - this.w / 2;
    }

    show(){
        this.p5.fill.apply(this.p5, this.color);
        this.p5.textSize(12);
        this.p5.textAlign(this.p5.CENTER);
        this.p5.text(this.type, this.x, this.y);
        if(this.selected){
            this.p5.fill.call(this.p5, ...this.color, 150);
            this.p5.rect(this.x - this.half, this.y - this.half, this.w, this.w);
        }
    }
    get left(){
        return this.x - this.half;
    }
    get right(){
        return this.x + this.half;
    }
    get top(){
        return this.y - this.half;
    }
    get bottom(){
        return this.y + this.half;
    }

    isInBounds(x, y){
        return (
            x > this.left && x < this.right &&
            y > this.top  && y < this.bottom
        );
    }

    select(val = true){
        this.selected = val;
    }

    getMoves(){return [];}

    move(){
        throw new Error("Unimplemented method move");
    }
}