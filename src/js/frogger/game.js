'use strict';

import Car from './car';
import Frog from './frog';
import Lane from './lane';
import Log from './log';

export default class GameState{
    constructor(p5){
        this.p5 = p5;
        this.gridSize = 50;
        this.lanes = [];
        this.logs = [];
        this.resetGame();
        this.generateCars();
    }
    show(){
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].show(car => {
                if(this.frog.intersects(car)){
                    this.resetGame();
                }
            });
        }

        let onLog = false;
        let log;
        for (let i = 0; i < this.logs.length; i++) {
            this.logs[i].show(l => {                
                if(l.intersects(this.frog)){
                    onLog = true;
                    log = l;
                }
            });
        }
        if(this.frog.y < this.p5.height - this.gridSize * (this.lanes.length + 2) && !(this.frog.y < this.gridSize)){
            if(onLog){
                this.frog.x += log.speed;
                this.frog.constrain();
            } else {
                this.resetGame();
            }
        }

        this.frog.show();
        
    }

    resetGame(){
        this.frog = new Frog(this.p5, this.p5.width / 2 - this.gridSize / 2, this.p5.height - this.gridSize *  5, this.gridSize);
    }

    generateCars(){
        let l1 = new Lane(this.p5, Car, 2, 300,  - this.gridSize * 2);
        l1.generateCars(3, 0, this.p5.height, this.gridSize * 2, this.gridSize);
        let l2 = new Lane(this.p5, Car, -3, 200,  - this.gridSize * 3);
        l2.generateCars(2, 150, this.p5.height, this.gridSize, this.gridSize);
        let l3 = new Lane(this.p5, Car, 1.2, 150,  - this.gridSize * 4);
        l3.generateCars(2, 25, this.p5.height, this.gridSize, this.gridSize);
        
        this.lanes.push(l1, l2, l3);

        
        let l5 = new Lane(this.p5, Log, 2.3, 250,  - this.gridSize * 6);
        l5.generateCars(2, 100, this.p5.height, this.gridSize * 3, this.gridSize);
        let l6 = new Lane(this.p5, Log, -1.3, 200,  - this.gridSize * 7);
        l6.generateCars(3, 30, this.p5.height, this.gridSize * 2, this.gridSize);

        this.logs.push(l5, l6);
    }

    handleKeyPress(e){
        switch(e.key){
            case "ArrowUp":
                this.frog.move(0, -1);
                break;
            case "ArrowDown":
                this.frog.move(0, 1);
                break;
            case "ArrowLeft":
                this.frog.move(-1, 0);
                break;
            case "ArrowRight":
                this.frog.move(1, 0);
                break;
            default:
                break;
        }
    }
}