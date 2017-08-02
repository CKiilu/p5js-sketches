'use strict';

const gridIndex = function(col, row, w = 0){
    col += this.offset[0];
    row +=  this.offset[1];
    return {
        col: col,
        row: row,
        w: w,
        x: col * w,
        y: row * w,
        checkBounds(x, y){
            return (
                this.x < x && this.x + this.w > x &&
                this.y < y && this.y + this.w > y
            )
        }
    }
}

export const _neighbourPosition = {
    TOP_LEFT: {
        index: 0,
        offset: [-1,-1],
        gridIndex,
    },
    LEFT: {
        index: 1,
        offset: [-1, 0],
        gridIndex
    },
    BOT_LEFT: {
        index: 2,
        offset: [-1, 1],
        gridIndex
    },
    TOP: {
        index: 3,
        offset: [0, -1],
        gridIndex
    },
    BOT: {
        index: 4,
        offset: [0, 1],
        gridIndex
    },
    TOP_RIGHT: {
        index: 5,
        offset: [1, -1],
        gridIndex
    },
    RIGHT: {
        index: 6,
        offset: [1, 0],
        gridIndex
    },
    BOT_RIGHT: {
        index: 7,
        offset: [1, 1],
        gridIndex
    }
};

export function _create2DArray (rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}

export function _loop2DArray(rows, cols, cb, cbAfterRow) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            cb(i, j);
        }
        if(typeof cbAfterRow === "function")
            cbAfterRow();
    }
}

export function _find2DArrayNeighbours(i, j, arr){
    const neighbours = [];

    for (let offCol = -1; offCol <= 1; offCol++) {
        let col = offCol + i;
        if (col < 0 || col >= arr.length) continue;
        for (let offRow = -1; offRow <= 1; offRow++) {
            let row = offRow + j;
            if (row < 0 || row >= arr[col].length || (i === col && j === row)) continue;
            neighbours.push(arr[col][row]);
        }            
    }

    return neighbours;
}