'use strict';

import {_find2DArrayNeighbours, _loop2DArray} from '../../shared';

export default class Piece{
    constructor(p5, type, indexes, w, player, side){
        this.p5 = p5;
        this.type = type;
        this.w = w;
        this.half = w / 2;
        this.selected = false;
        this.color = player.color;
        this.player = player;
        this.side = side;
        this.indexes = indexes;
        this.moves = [];
        this.hasMoved = false;
        this.pre = "";
    }

    loadImage(){
        if(this.pre){
            this.imgURL =  `./img/Chess_${this.pre}${this.side < 0 ? "l" : "d"}t60.png`;
            this.img = this.p5.loadImage(this.imgURL);
        }
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
        if(!this.img){
            this.p5.fill.apply(this.p5, this.color);
            this.p5.textSize(12);
            this.p5.textAlign(this.p5.CENTER);
            this.p5.text(this.type, this.x, this.y);
        } else {
            this.p5.image(this.img, this.left, this.top, this.w, this.w);
        }
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

    checkPointWithinGrid(pos){
        return (
            pos.col < 8 && pos.col >= 0 &&
            pos.row < 8 && pos.row >= 0
        )
    }

    select(val = true){
        if(this.player.turn)
            this.selected = val;
    }

    findNeighbours(grid, col = this.indexes.col, row = this.indexes.row){
        return this.neighbours = _find2DArrayNeighbours(col, row, grid);
    }

    getMoves(grid){        
        throw new Error("Unimplemented method getMoves(grid) : returns Array");
    }

    move(grid, point){
        this.hasMoved = true;
        let piece = grid[point.col][point.row];
        grid[point.col][point.row] = grid[this.indexes.col].splice(this.indexes.row, 1, undefined)[0];
        grid[point.col][point.row].indexes = point;
        this.player.turn = true;
        if(point.castling){
            grid[point.rookToIndexes.col][point.rookToIndexes.row] = grid[point.rookFromIndexes.col].splice(point.rookFromIndexes.row, 1, undefined)[0];
            grid[point.rookToIndexes.col][point.rookToIndexes.row].indexes = point.rookToIndexes;
        }
        if(piece && piece.points){
            this.player.score += piece.points;
            this.player.piecesCaptured.push(piece.imgURL);
        }

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