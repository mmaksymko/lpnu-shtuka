class Stroke {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint
        this.endPoint = endPoint
    }

    draw = () => {
        line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    }

    middlePoint = () =>
        new Point(Math.abs(this.startPoint.x + this.endPoint.x) / 2, Math.abs(this.startPoint.y + this.endPoint.y) / 2)

    length = () => Math.sqrt(
        Math.pow((this.startPoint.x - this.endPoint.x), 2) +
        Math.pow((this.startPoint.y - this.endPoint.y), 2))
}