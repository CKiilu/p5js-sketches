'use strict';

import Piece from './piece';

import Bishop from './bishop';
import King from './king';
import Knight from './knight';
import Pawn from './pawn';
import Queen from './queen';
import Rook from './rook';


export function pieceGenerator(...args){
    switch(args[1]){
        case 'BISHOP':
            return new Bishop(...args, "b");            
        case 'KING':
            return new King(...args, "k");            
        case 'KNIGHT':
            return new Knight(...args, "n");            
        case 'PAWN':
            return new Pawn(...args, "p");          
        case 'QUEEN':
            return new Queen(...args, "q");            
        case 'ROOK':
            return new Rook(...args, "r");
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