class Shape {

    constructor() {

    }

    info ():string {
        return 'this is a shape';
    }
}


class Rectangle extends Shape {

    hight;
    width;

    constructor(hight: number, width: number) {
        super();
        this.hight = hight;
        this.width = width;
    }

    info(): string {
        return 'this is retangle';
    }

    area ():number {
        return this.hight * this.width;
    }

    scale (num:number = 2):this {
        this.hight = this.hight + num;
        this.width = this.width + num;
        return this;
    }


}


class ColoredRectangle extends Rectangle {

    color

    constructor(color:string, hight: number, width: number){
        super(hight, width);
        this.color = color;
    }

    info(): string {
        return `this is ${this.color} rectangle`;
    }

}


class Square extends Rectangle {

    side;

    constructor(side: number) {
        super(side, side);
        this.side = side;
    }

    info(): string {
        return 'this is square';
    }

    area ():number {
        return this.side * this.side;
    }

}







class Shape2 {

    constructor() {

    }

    draw(): void {
        console.log('drawing a shape');
    }

}



class Circle extends Shape2 {

    constructor () {
        super();
    }

    draw(): void {
        console.log('drawing a circle');
    }
}

class Square2  extends Shape2 {

    constructor () {
        super();
    }

    draw(): void {
        console.log('drawing a square ');
    }
}

class Triangle extends Shape2 {

    constructor () {
        super();
    }

    draw(): void {
        console.log('drawing a triangle');
    }
}


function renderShapes(arr:Shape2[]) {
    arr.forEach(element => {
        element.draw();
    });
}