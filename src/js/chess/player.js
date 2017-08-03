'use strict';

import {pieceTypes, pieceGenerator} from './config';

export default class Player {
    constructor(gameState, turn, color, rowOff = 0){
        this.gameState = gameState;
        this.turn = turn;
        this.color = color;
        this.rowOff = rowOff;
        this.score = 0;
    }

    loadPieces(){
        let types = pieceTypes.slice();
        let side = 1;
        if(this.rowOff !== 0){
            side = -1;
            types.reverse();
        }
        
        for (let col = 0; col < 8; col++) {
            let i = 0;
            for (let r = 0; r < 2; r++) {
                let row = r + this.rowOff;
                this.gameState.grid[col][row] = pieceGenerator(this.gameState.p5, types[r][col], {col, row}, this.gameState.pieceSize, this, side);
                i++;
            }
        }
    }
}