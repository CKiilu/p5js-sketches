'use strict';

import Piece from './queen';

export default class King extends Piece {
    constructor(...args){
        super(...args);
        this.multi = false;
    }
}