'use strict';

import Piece from './piece';

export default class Knight extends Piece {
    constructor(...args){
        super(...args);
        this.points = 3;
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);
        for(let i = -3; i <= 3; i += 2){
            for(let j = -3; j <= 3; j += 2){
                let col = Math.abs(i) === 3 ? Math.sign(i) * 2 : i;
                let row = Math.abs(j) === 3 ? Math.sign(j) * 2 : j;
                col += this.indexes.col;
                row += this.indexes.row;
                if(Math.abs(i) !== Math.abs(j) && 
                    this.checkPointWithinGrid({col, row})
                ){
                    let piece = grid[col][row];
                    if(piece && piece.side + this.side !== 0) continue;

                    this.moves.push(this.createMovementPoint(col, row));
                }
            }
        }


        return this.moves;
    }
}