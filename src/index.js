// Import p5.js and libraries
import p5 from './libraries/p5/p5';
import './libraries/p5/addons/p5.dom';
import './libraries/p5/addons/p5.sound';

// Import sketch instances
import {
    pong, bst, minesweeper,
    frogger, chess,
} from "./js/sketch";

new p5(chess, 'sketchContainer');