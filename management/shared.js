'use strict';

const fs = require('fs');
const path = require('path');


const srcDir = path.join(__dirname, '..', 'src');
const sketchRootPath = path.join(srcDir, 'js/');
const sketchPath = path.join(sketchRootPath, 'sketch.js');
const indexPath = path.join(srcDir, 'index.js');

module.exports = {
    editFile(name, path, cb) {    
        fs.readFile(path, 'utf-8', function (err, data) {
            if(err)
                return console.log(err);

            let lines = cb(data.split(/\r{0,1}\n/));

            fs.writeFile(path, lines.join("\n"));
        });
    },
    srcDir,
    sketchRootPath,
    sketchPath,
    indexPath,
}