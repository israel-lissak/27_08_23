"use strict";
class Shape {
    constructor() {
    }
    info() {
        return 'this is a shape';
    }
}
class Rectangle extends Shape {
    constructor(hight, width) {
        super();
        this.hight = hight;
        this.width = width;
    }
    info() {
        return 'this is retangle';
    }
    area() {
        return this.hight * this.width;
    }
    scale(num = 2) {
        this.hight = this.hight + num;
        this.width = this.width + num;
        return this;
    }
}
class ColoredRectangle extends Rectangle {
    constructor(color, hight, width) {
        super(hight, width);
        this.color = color;
    }
    info() {
        return `this is ${this.color} rectangle`;
    }
}
class Square extends Rectangle {
    constructor(side) {
        super(side, side);
        this.side = side;
    }
    info() {
        return 'this is square';
    }
    area() {
        return this.side * this.side;
    }
}
class Shape2 {
    constructor() {
    }
    draw() {
        console.log('drawing a shape');
    }
}
class Circle extends Shape2 {
    constructor() {
        super();
    }
    draw() {
        console.log('drawing a circle');
    }
}
class Square2 extends Shape2 {
    constructor() {
        super();
    }
    draw() {
        console.log('drawing a square ');
    }
}
class Triangle extends Shape2 {
    constructor() {
        super();
    }
    draw() {
        console.log('drawing a triangle');
    }
}
function renderShapes(arr) {
    arr.forEach(element => {
        element.draw();
    });
}
