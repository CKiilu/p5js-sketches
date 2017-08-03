'use strict';

import Piece from './queen';

export default class King extends Piece {
    constructor(...args){
        super(...args);
        this.multi = false;
    }

    getMoves(grid){
        super.getMoves(grid);
        let col = (off) => this.indexes.col - off;
        let piece = (off) => (grid[col(off)][this.indexes.row]);
        console.log(this.hasMoved)
        if(!this.hasMoved){
            let nearKing = piece(this.side);
            let nearRook = piece(this.side * 2);
            let rook = piece(this.side * 3);
            console.log(rook , nearKing, nearRook)
            if(!rook.hasMoved && !nearKing && !nearRook){
                this.moves.push(Object.assign({}, this.createMovementPoint(col(this.side * 2), this.indexes.row), {
                    castling: true,
                    rookFromIndexes: this.createMovementPoint(col(this.side * 3), this.indexes.row),
                    rookToIndexes: this.createMovementPoint(col(this.side), this.indexes.row)
                }))
            }
        }

        return this.moves;
    }
}