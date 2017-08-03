'use strict';

import Piece from './piece';

import {_find2DArrayNeighbours, _neighbourPosition} from '../shared';

export default class MultiMovementPiece extends Piece{
    constructor(...args){
        super(...args)
        this.multi = true;
    }

    addMovesResetNeighbours(pos, grid){
        this.addMoves(pos, grid);
        this.findNeighbours(grid);
    }

    addMoves(pos, grid, col = this.indexes.col, row = this.indexes.row){
        let neighbour = this.neighbours[_neighbourPosition[pos].index];
        let res = _neighbourPosition[pos].gridIndex(col, row, this.w);
        
        if(!this.checkPointWithinGrid(res)) return;

        if(neighbour){
            if(neighbour.side + this.side === 0){
                this.moves.push(res);
            }
            
            return;
        }

        this.moves.push(res);
        
        if(this.multi){
            this.findNeighbours(grid, res.col, res.row);
            return this.addMoves(pos, grid, res.col, res.row);
        }
    }
}