class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    getAsVector = () => [this.x, this.y]
    static fromVector = (vec) => new Point(vec[0], vec[1])
}