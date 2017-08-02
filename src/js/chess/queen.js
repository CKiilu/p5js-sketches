'use strict';

import Piece from './piece';

export default class Queen extends Piece {
    constructor(...args){
        super(...args);
        this.points = 9;        
    }
}