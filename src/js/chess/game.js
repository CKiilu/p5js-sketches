'use strict';

import {_create2DArray, _loop2DArray} from '../shared';
import {pieceTypes, pieceGenerator} from './config';



export default class GameState{
    constructor(p5, blackFirst = true){
        this.p5 = p5;
        this.gridSize = 8;
        this.pieceSize = (p5.width - 1) / 8;
        this.grid = _create2DArray(this.gridSize, this.gridSize);
        this.isBlack = !blackFirst;
        this.possibleMoves = [];
        this.selectedPiece = null;
        this.loadBoard();
    }

    loadPieces(color, rowOff = 0){
        let types = pieceTypes.slice();
        let side = 1;
        if(rowOff !== 0){
            side = -1;
            types.reverse();
        }
        
        for (let col = 0; col < 8; col++) {
            let i = 0;
            for (let r = 0; r < 2; r++) {
                let row = r + rowOff;
                this.grid[col][row] = pieceGenerator(this.p5, types[r][col], {col, row}, this.pieceSize, color, side);
                i++;
            }
        }
    }

    loadBoard(){
        this.loadPieces([255, 0, 0]);
        this.loadPieces([40,156,86], 6);
    }

    show(){
        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            this.isBlack = !this.isBlack;
            this.p5.fill(this.isBlack ? 0 : 255);
            this.p5.rect(j * this.pieceSize, i * this.pieceSize, this.pieceSize, this.pieceSize);
        }, () => this.isBlack = !this.isBlack);

        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            let piece = this.grid[i][j];
            if(piece){
                piece.show();
            }
        });

        for (let i = 0; i < this.possibleMoves.length; i++) {
            let {x, y, w} = this.possibleMoves[i];
            this.p5.fill(7, 121, 245, 100);
            this.p5.rect(x, y, w, w);
        }
    }

    handleClick(e){
        let selectionMade = false, hasMoved = false;

        let move;
        if(move = this.possibleMoves.find((v) => v.checkBounds(this.p5.mouseX, this.p5.mouseY))){
            this.grid = this.selectedPiece.move(this.grid.slice(), move)
            hasMoved = true;                    
        }
        if(!hasMoved){
            _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
                let piece = this.grid[i][j];
                if(piece && !hasMoved){
                    piece.select(false);
                    if(piece.isInBounds(this.p5.mouseX, this.p5.mouseY)){
                        piece.select();
                        this.possibleMoves = piece.getMoves(this.grid);
                        this.selectedPiece = piece;
                        selectionMade = true;
                    }
                }
            });
        }

        if(!selectionMade || hasMoved){
            this.selectedPiece = null;
            this.possibleMoves = [];
        }
    }
}