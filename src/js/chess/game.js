'use strict';

import {_create2DArray, _loop2DArray} from '../shared';
import Player from './player';

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

    get getPlayer1(){
        return this.player1;
    }
    get getPlayer2(){
        return this.player2;
    }
    setPlayer1Name(){
        this.player1.name = name;
    }
    setPlayer2Name(){
        this.player2.name = name;
    }

    loadBoard(){
        this.player1 = new Player(this, true, [255, 0, 0]);
        this.player2 = new Player(this, false, [40,156,86], 6);
        this.player1.loadPieces();
        this.player2.loadPieces();
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

        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            let piece = this.grid[i][j];
            if(piece){
                if(!hasMoved && piece.player.turn){
                    piece.select(false);
                    if(piece.isInBounds(this.p5.mouseX, this.p5.mouseY)){
                        piece.select();
                        this.possibleMoves = piece.getMoves(this.grid);
                        this.selectedPiece = piece;
                        selectionMade = true;
                    }
                } else if(hasMoved && this.selectedPiece) {
                    piece.player.turn = (piece.player !== this.selectedPiece.player);
                }
            }
        });

        if(!selectionMade || hasMoved){
            this.selectedPiece = null;
            this.possibleMoves = [];
        }
    }
}