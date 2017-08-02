export default class Paddle {
    constructor(p5, left){
        this.y = p5.height / 2;
        this.w = 10;
        this.h = 100;
        this.p5 = p5;
        this.x = (left) ? this.w : p5.width - this.w;
        this.ychange = 0
    }

    show(){
        this.p5.fill(255);
        this.p5.rectMode(this.p5.CENTER);
        this.p5.rect(this.x, this.y, this.w, this.h);

        return this;
    }

    move(steps){
        this.ychange = steps;
    }

    update(){
        this.y += this.ychange;
        this.y = this.p5.constrain(this.y, this.h / 2, this.p5.height - (this.h / 2));

        return this;
    }
}