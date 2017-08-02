export class Node {
    constructor(val){
        this.value = val;
        this.left = null;
        this.right = null;
    }

    addNode(node) {
        if(node.value < this.value){
            if(this.left){
                this.left.addNode(node);
            } else {
                this.left = node;
                this.left.x = this.x - 50;
                this.left.y = this.y + 20;
            }
        } else if (node.value > this.value) {
            if(this.right){
                this.right.addNode(node);
            } else {
                this.right = node;
                this.right.x = this.x + 50;
                this.right.y = this.y + 20;
            }
        }
    }

    visit(parent, cb){
        this.left && this.left.visit(this);
        console.log(this.value);
        if(cb && typeof cb === "function")
            cb(parent);
        this.right && this.right.visit(this);
    }

    search(val, path=[]){
        path.push(this);
        if(this.value == val){
            return [this, path];
        } else if(val < this.value && this.left){
            return this.left.search(val, path);
        } else if(val > this.value && this.right){
            return this.right.search(val, path);
        }

        return [null, path];
    }
}

export default class GraphicalNode extends Node {
    constructor(val, p5, x, y){
        super(val);
        this.x = x;
        this.y = y;
        this.p5 = p5;

        return this;
    }

    draw(parent){
        this.p5.fill(255);
        this.p5.noStroke();
        this.p5.textAlign(this.p5.CENTER);
        this.p5.text(this.value, this.x, this.y);
        this.p5.stroke(255);
        this.p5.noFill();
        this.p5.line(parent.x, parent.y, this.x, this.y);
        this.p5.ellipse(this.x, this.y, 20, 20);
    }

    visit(){
        super.visit(this, this.draw.bind(this));
    }
}