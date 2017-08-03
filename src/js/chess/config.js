'use strict';

import Piece from './pieces/piece';

import Bishop from './pieces/bishop';
import King from './pieces/king';
import Knight from './pieces/knight';
import Pawn from './pieces/pawn';
import Queen from './pieces/queen';
import Rook from './pieces/rook';


export function pieceGenerator(...args){
    switch(args[1]){
        case 'BISHOP':
            return new Bishop(...args);
        case 'KING':
            return new King(...args);
        case 'KNIGHT':
            return new Knight(...args);
        case 'PAWN':
            return new Pawn(...args);
        case 'QUEEN':
            return new Queen(...args);
        case 'ROOK':
            return new Rook(...args);
        default:
            return new Piece(...args);
    }
}

export const pieceTypes = [
    [
    'ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 
    'KING', 'BISHOP', 'KNIGHT','ROOK'
    ],
    new Array(8).fill("PAWN")
];