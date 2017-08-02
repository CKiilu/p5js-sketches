import Node from './node';

export default class Tree {
    constructor(p5){
        this.root = null;
        this.p5 = p5;
    }

    addNode(val, x, y){
        let node = new Node(val, this.p5, x, y);
        if(this.root == null){
            this.root = node;
        } else {
            this.root.addNode(node);
        }
    }

    traverse(){
        this.root.visit();
    }

    search(val){
        return this.root.search(val);
    }
}