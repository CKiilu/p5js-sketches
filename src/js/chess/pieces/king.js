'use strict';

import Piece from './queen';

export default class King extends Piece {
    constructor(...args){
        super(...args);
        this.multi = false;
        this.pre = "k";
    }

    getMoves(grid){
        super.getMoves(grid);
        let col = (off) => this.indexes.col - off;
        let piece = (off) => (grid[col(off)][this.indexes.row]);

        if(!this.hasMoved){
            this.castlingOnKingSide(piece, col);
            this.castlingOnQueenSide(piece, col);
        }

        return this.moves;
    }

    castlingOnQueenSide(piece, col){
        let queen = piece(-this.side);
        let bishop = piece(-this.side * 2);
        let knight = piece(-this.side * 3);
        let rook = piece(-this.side * 4);
        if(!rook.hasMoved && !queen && !bishop && !knight){
            this.moves.push(Object.assign({}, this.createMovementPoint(col(-this.side * 2), this.indexes.row), {
                castling: true,
                rookFromIndexes: this.createMovementPoint(col(-this.side * 4), this.indexes.row),
                rookToIndexes: this.createMovementPoint(col(-this.side), this.indexes.row)
            }))
        }
    }

    castlingOnKingSide(piece, col){
        let bishop = piece(this.side);
        let knight = piece(this.side * 2);
        let rook = piece(this.side * 3);
        if(!rook.hasMoved && !bishop && !knight){
            this.moves.push(Object.assign({}, this.createMovementPoint(col(this.side * 2), this.indexes.row), {
                castling: true,
                rookFromIndexes: this.createMovementPoint(col(this.side * 3), this.indexes.row),
                rookToIndexes: this.createMovementPoint(col(this.side), this.indexes.row)
            }))
        }
    }
}