'use strict';
import Cell from './cell';
import {_create2DArray, _loop2DArray} from '../shared';

export default class Board{
    constructor(difficulty, gridSize = 20, cellSize = 20){
        this.difficulty = difficulty;
        this.gridSize = gridSize;
        this.cellSize = cellSize;
        this.grid = _create2DArray(this.gridSize, this.gridSize);
        
        console.log(difficulty)
        return this;
    }

    setup(s){
        let l = this.difficulty / 11;
        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            this.grid[i][j] = new Cell(s, i * this.cellSize, j * this.cellSize, this.cellSize, l);
        })

        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            this.grid[i][j].findNeighbours(i, j, this.grid);
        })
    }

    draw(){
        _loop2DArray(this.gridSize, this.gridSize, (i, j) => {
            this.grid[i][j].show();
        });
    }

    handleClick(s){
        _loop2DArray(this.gridSize, this.gridSize, (i,j) => {
            if(this.grid[i][j].contains(s.mouseX, s.mouseY)){
                this.grid[i][j].reveal();
            }
        });
    }
}