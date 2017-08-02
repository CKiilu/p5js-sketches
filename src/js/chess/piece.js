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
    
    get x(){
        return (this.indexes.col + 1) * this.w - this.w / 2;
    }
    get y(){
        return (this.indexes.row + 1) * this.w - this.w / 2;
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

    isInBounds(x, y){
        return (
            x > this.left && x < this.right &&
            y > this.top  && y < this.bottom
        );
    }

    select(val = true){
        this.selected = val;
    }

    getMoves(){
        throw new Error("Unimplemented method getMoves(grid) : returns Array");
    }

    move(grid, point){
        this.hasMoved = true;
        grid[point.col][point.row] = grid[this.indexes.col].splice(this.indexes.row, 1, undefined)[0];
        grid[point.col][point.row].indexes = point;

        return grid;
    }

    createMovementPoint(col, row){
        return {
            col: col,
            row: row,
            w: this.w,
            x: col * this.w,
            y: row * this.w,
            checkBounds(x, y){
                return (
                    this.x < x && this.x + this.w > x &&
                    this.y < y && this.y + this.w > y
                )
            }
        }
    }
}