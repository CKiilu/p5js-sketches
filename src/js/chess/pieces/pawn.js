'use strict';

import Piece from './piece';
import {pieceGenerator} from '../config';

import {_neighbourPosition} from '../../shared';

const TOP = "TOP";
const BOT = "BOT";

export default class Pawn extends Piece {
    constructor(...args){
        super(...args);
        this.points = 1;
        this.pre = "p";
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);
        if(this.side < 0)
            this.getMovesByPos(BOT);
        else
            this.getMovesByPos(TOP);
        return this.moves;
    }

    getMovesByPos(pos){
        let topLeft = this.neighbours[_neighbourPosition[pos + "_LEFT"].index];
        let topRight = this.neighbours[_neighbourPosition[pos + "_RIGHT"].index];
        let top = this.neighbours[_neighbourPosition[pos].index];
        let left = this.neighbours[_neighbourPosition.LEFT.index];
        let right = this.neighbours[_neighbourPosition.RIGHT.index];
        let val = _neighbourPosition[pos].gridIndex(this.indexes.col, this.indexes.row, this.w);
        
        if(!top){
            this.moves.push(val);

            if(!this.hasMoved){
                let off = pos === BOT ? val.row + 1 : val.row - 1;
                this.moves.push(Object.assign({}, val, { 
                    x: this.w * val.col,
                    y: this.w * off,
                    row: off
                }));  
            }
        }

        if(pos === BOT && this.indexes.row === 4){
            this.addEnpassantMove(left, 1);
            this.addEnpassantMove(right, 1);
        } else if (pos === TOP && this.indexes.row === 3){
            this.addEnpassantMove(left, -1);
            this.addEnpassantMove(right, -1);
        }
        
        if(topLeft && topLeft.side + this.side === 0){
            this.moves.push(_neighbourPosition[pos + "_LEFT"].gridIndex(this.indexes.col, this.indexes.row, this.w));
        }
        if(topRight && topRight.side + this.side === 0){
            this.moves.push(_neighbourPosition[pos + "_RIGHT"].gridIndex(this.indexes.col, this.indexes.row, this.w));
        }
    }

    addEnpassantMove(val, off){
        if(val && val.history.length === 1 && val.pre === "p"){
            this.moves.push(Object.assign({}, this.createMovementPoint(this.indexes.col + off, this.indexes.row + off), {
                first: this.createMovementPoint(val.indexes.col, val.indexes.row)
            }));
        }
    }

    move(grid, point){
        grid = super.move(grid, point);
        let self = this;
        if(point.row === 0 || point.row === 7){
            let choiceDiv = this.p5.createDiv(`
            <div style="position:absolute;top: 31%;left: 21.1%;width: 300px;background: #fff;height: 300px;display: grid;grid-template-columns: repeat(1, 1fr);grid-template-rows: repeat(3, 1fr);">
                <h2 class="row1" style="
                text-align: center;
            "> Select your piece </h2>
                <div class="row2" style="
                grid-template-columns: repeat(2, 1fr);
                display: grid;
                margin: 0 auto;
                grid-column-gap: 80px;
            ">
                    <img src="img/Chess_q${this.imgColor}t60.png" data-type="QUEEN" style="box-shadow: 1px 2px 50px 7px #000;">
                    <img src="img/Chess_r${this.imgColor}t60.png" data-type="ROOK" style="
                box-shadow: 1px 2px 50px 7px #000;
            ">
                </div>
                <div class="row3" style="
                grid-template-columns: repeat(2, 1fr);
                display: grid;
                margin: 0 auto;
                grid-column-gap: 80px;
            ">
                    <img src="img/Chess_b${this.imgColor}t60.png" data-type="BISHOP" style="
                box-shadow: 1px 2px 50px 7px #000;
            ">
                    <img src="img/Chess_n${this.imgColor}t60.png" data-type="KNIGHT" style="
                box-shadow: 1px 2px 50px 7px #000;
            ">
                </div>
            </div>
            `);
            choiceDiv.parent(this.p5.select("#sketchContainer"))
            this.p5.selectAll("img", choiceDiv).forEach(el => el.mouseClicked(function(e) {
                grid[point.col][point.row] = pieceGenerator(
                    self.p5, this.attribute("data-type"),
                    self.indexes, self.w, self.player, self.side
                );
                grid[point.col][point.row].loadImage();
                choiceDiv.remove();
            }))
        }

        return grid;
    }
}