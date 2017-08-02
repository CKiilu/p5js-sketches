'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {
    editFile, srcDir,
    sketchRootPath, sketchPath,
    indexPath,
} = require('./shared');

(function rmSketch(name){
    const sketchFolder = path.join(sketchRootPath, name);
    fse.remove(sketchFolder, function(err){
        if(err)
            return console.log(err);

            
        editFile(name, sketchPath, (lines) => {
            lines = lines.filter(l => !new RegExp(`import ${name} from './${name}';`).test(l))
            let lineStr = lines.join("\n");
            let exportBlock = lineStr.slice(lineStr.lastIndexOf("export")).split("\n");
            let exportI = lines.length - exportBlock.length;
            let exportLines = exportBlock.slice(1, exportBlock.length - 1);
            let exportArr = exportLines.join("").split(",")
            let chunkedExports = filterPortsAndChunk(exportArr, name);
            
            return [...lines.slice(0, exportI), exportBlock[0], ...chunkedExports, exportBlock[exportBlock.length - 1]];
        });
        editFile(name, indexPath, (lines) => {
            lines = lines.filter(l => !new RegExp(`import ${name} from './${name}';`).test(l))
            let lineStr = lines.join("\n");
            let importBlock = lineStr.slice(lineStr.lastIndexOf("import"));
            let importBlockArr = importBlock.split("\n");
            let importIStart = lines.length - importBlockArr.length;
            importBlockArr = importBlock.slice(0, importBlock.indexOf(`} from "./js/sketch";`)).split("\n");
            importBlockArr.shift();
            let importIStop = importIStart + importBlockArr.length;
            let importArr = importBlockArr.join("").split(",");
            let chunkedImports = filterPortsAndChunk(importArr, name);

            return [...lines.slice(0, importIStart + 1), ...chunkedImports, ...lines.slice(importIStop)];
        });
    });
}(process.argv[2]));


function filterPortsAndChunk(portArr, name) {
    for (let i = 0; i < portArr.length; i++) {
        let el = portArr[i].trim();
        if(el === "" || el === name)
            portArr.splice(i--,1);
    }
    let chunkedPorts = [];
    for (let i = 0; i < portArr.length; i += 4) {
        chunkedPorts.push(portArr.slice(i, i+4).join(",") + ",");
    }

    return chunkedPorts;
}