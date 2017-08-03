'use strict';

import Piece from './multi-piece';

export default class Queen extends Piece {
    constructor(...args){
        super(...args);
        this.points = 9;        
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);

        this.addMovesResetNeighbours("TOP", grid);
        this.addMovesResetNeighbours("BOT", grid);
        this.addMovesResetNeighbours("LEFT", grid);
        this.addMovesResetNeighbours("RIGHT", grid);


        this.addMovesResetNeighbours("TOP_LEFT", grid);
        this.addMovesResetNeighbours("BOT_LEFT", grid);
        this.addMovesResetNeighbours("TOP_RIGHT", grid);
        this.addMovesResetNeighbours("BOT_RIGHT", grid);

        return this.moves;
    }
}