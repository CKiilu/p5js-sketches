import Tree from './tree';
import Node from './node';

const sketch = (s) => {
    let tree;
    s.setup = function() {
        s.createCanvas(600, 400);
        s.background(41);
        tree = new Tree(s);
        let root = tree.addNode(56, s.width / 2, s.height / 8)
        for (var i = 0; i < 100; i++) {
            tree.addNode(s.floor(s.random(0,100)));
        }
        tree.addNode(5);
        tree.addNode(3);
        tree.addNode(7);
        tree.addNode(6);

        console.log(tree);
        tree.traverse();
        console.log(tree.search(101));
    }
    
    s.draw = function() {
    }
    
};

export default sketch;
