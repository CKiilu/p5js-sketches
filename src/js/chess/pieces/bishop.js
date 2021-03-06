'use strict';

import Piece from './multi-piece';

export default class Bishop extends Piece{
    constructor(...args){
        super(...args);
        this.points = 3;
        this.pre = "b";
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);

        this.addMovesResetNeighbours("TOP_LEFT", grid);
        this.addMovesResetNeighbours("BOT_LEFT", grid);
        this.addMovesResetNeighbours("TOP_RIGHT", grid);
        this.addMovesResetNeighbours("BOT_RIGHT", grid);

        return this.moves;
    }
}