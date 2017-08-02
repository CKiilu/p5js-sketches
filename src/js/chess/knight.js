'use strict';

import Piece from './piece';

export default class Knight extends Piece {
    constructor(...args){
        super(...args);
        this.points = 3;
    }

    getMoves(grid){
        this.moves = [];
        let checkWithinGrid = (n, val) => (n + val < 8 && n + val >= 0 )
        for(let i = -3; i <= 3; i += 2){
            for(let j = -3; j <= 3; j += 2){
                let col = Math.abs(i) === 3 ? Math.sign(i) * 2 : i;
                let row = Math.abs(j) === 3 ? Math.sign(j) * 2 : j;
                if(Math.abs(i) !== Math.abs(j) && 
                    checkWithinGrid(col, this.indexes.col) && 
                    checkWithinGrid(row, this.indexes.row)
                ){
                    col += this.indexes.col;
                    row += this.indexes.row;
                    let piece = grid[col][row];
                    if(piece && piece.side + this.side !== 0) continue;

                    this.moves.push(this.createMovementPoint(col, row));
                }
            }
        }


        return this.moves;
    }
}