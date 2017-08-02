'use strict';

const fs = require('fs');
const path = require('path');
const {
    editFile, srcDir,
    sketchRootPath, sketchPath,
    indexPath,
} = require('./shared');


(function addSketch(name){
    const sketchFolder = path.join(sketchRootPath, name);
    const checkVarCount = (i, arr) => {
        if(arr[i - 1].split(",").length < 4)
            arr[i - 1] += ` ${name},`;
        else
            arr.splice(i, 0, `    ${name},`);
    };
    fs.mkdir(sketchFolder, function(err){
        if(err)
            return console.log(err);
        fs.writeFile(path.join(sketchFolder, 'game.js'), defaultGameState());            
        fs.writeFile(path.join(sketchFolder, 'index.js'), defaultSketch(), function(err){
            if (err) 
                return console.log(err);
            
            editFile(name, sketchPath, (lines) => {
                lines.splice(1, 0, `import ${name} from './${name}';`);
                checkVarCount(lines.length - 1,lines)

                return lines;
            });
            editFile(name, indexPath, (lines) => {
                checkVarCount(lines.length - 3, lines)
                
                return lines;
            });
        });
    });
}(process.argv[2]));

function defaultSketch(){
    return `'use strict';

import GameState from './game';

const sketch = (s) => {
    let gameState;
    s.setup = function() {
        s.createCanvas(600, 400);
        gameState = new GameState(s);
    }
    
    s.draw = function() {
        s.background(41);
        
        gameState.show();
    }
    
};

export default sketch;
`
}

function defaultGameState(){
    return `'use strict';
    
export default class GameState{
    constructor(p5){
        this.p5 = p5;
    }
    show(){


        return this;
    }
}
`
}