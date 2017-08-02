'use strict';

const fs = require('fs');
const path = require('path');
const {
    editFile, srcDir,
    sketchRootPath, sketchPath,
    indexPath,
} = require('./shared');

(function addFiles(name, files){
    const sketchFolder = path.join(sketchRootPath, name);
    files.forEach((f, i, arr) => {
        fs.writeFile(path.join(sketchFolder, f.toLowerCase()+".js"), getFileText(f));
    })
}(process.argv[2], process.argv.slice(3)))

function getFileText(name) {
    return `'use strict';

export default class ${name} {
    constructor(){

    }
}`;
}