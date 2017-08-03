'use strict';

import Piece from './multi-piece';

export default class Rook extends Piece {
    constructor(...args){
        super(...args);
        this.points = 5;
        this.pre = "r";
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);

        this.addMovesResetNeighbours("TOP", grid);
        this.addMovesResetNeighbours("BOT", grid);
        this.addMovesResetNeighbours("LEFT", grid);
        this.addMovesResetNeighbours("RIGHT", grid);

        return this.moves;
    }
}