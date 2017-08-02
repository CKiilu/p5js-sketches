'use strict';
import {_find2DArrayNeighbours} from '../shared';
export default class Cell {
    constructor(p5, x, y, s, level){
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.s = s;
        this.half = s / 2;
        this.neighbourCount = 0;
        this.neighbours = [];
        
        this.revealed = false;
        this.mine = p5.random(1) < level - 0.05;
    }

    show(){
        this.p5.stroke(0);
        this.p5.noFill();
        this.p5.rect(this.x, this.y, this.s, this.s);

        if(this.revealed){
            if(this.mine){
                this.p5.fill(126);
                this.p5.ellipse(this.x + this.half, this.y + this.half, this.half);
            } else {
                this.p5.fill(200);
                this.p5.rect(this.x, this.y, this.s, this.s);
                this.p5.textAlign(this.p5.CENTER);
                this.p5.fill(0);
                this.p5.text(this.neighbourCount || '', this.x + this.half, this.y + this.half * 1.5);
            }
        }
    }

    contains(x, y){
        return (x > this.x && x < this.x + this.s
            && y > this.y && y < this.y + this.s);
    }

    reveal(){
        this.revealed = true;
        if(this.neighbourCount === 0)
            this.clearSpaces();
    }

    findNeighbours(i, j, grid){
        if(this.mine){
            return this.neighbourCount = -1;
        }
        let total = 0;
        this.neighbours = _find2DArrayNeighbours(i, j, grid);

        for (let i = 0; i < this.neighbours.length; i++) {
            let el = this.neighbours[i];
            if(el.mine)
                total++
        }

        return this.neighbourCount = total;
    }

    clearSpaces(){
        for (let i = 0; i < this.neighbours.length; i++) {
            let el = this.neighbours[i];
            if(!el.mine && !el.revealed){
                el.reveal();
            }
        }
    }
}