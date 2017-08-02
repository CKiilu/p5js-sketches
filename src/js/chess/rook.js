'use strict';

import Piece from './piece';
import {_find2DArrayNeighbours} from '../shared';

export default class Rook extends Piece {
    constructor(...args){
        super(...args);
        this.points = 5;
    }

    getMoves(grid){
        this.moves = [];
        this.findNeighbours(grid);
        let checkWithinGrid = (n, val) => (n + val < 8 && n + val >= 0 )
        let neighbours

        return this.moves;
    }
}