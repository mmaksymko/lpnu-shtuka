class Triangle {
    constructor(aX = null, aY = null, bX = null, bY = null, cX = null, cY = null) {
        this.a = new Point(aX, aY)
        this.b = new Point(bX, bY)
        this.c = new Point(cX, cY)
        if (!this.checkIfValid())
            throw new Error('Трикутника з такими точками не може існувати!');
    }

    getAsMatrix = () => [this.a.getAsVector(), this.b.getAsVector(), this.c.getAsVector()]
    transform(matrix) {
        let result = GeometryManager.multiplyMatrices(this.getAsMatrix(), matrix);
        this.a = Point.fromVector(result[0])
        this.b = Point.fromVector(result[1])
        this.c = Point.fromVector(result[2])
    }
    mirror = () => this.transform([[-1, 0], [0, -1]])
    scale = (xScale, yScale = xScale) => this.transform([[xScale, 0], [0, yScale]])

    #length = (A, B) => Math.hypot(A.x - B.x, A.y - B.y)
    #round = (num) => Number.parseFloat(num).toFixed(2);

    toMatrixString = () => `\t${this.#round(this.a.x)}\t ${this.#round(this.a.y)}\n(\t${this.#round(this.b.x)}\t ${this.#round(this.b.y)}\t)\n\t ${this.#round(this.c.x)} ${this.#round(this.c.y)}`
    toString = () => `A(${this.#round(this.a.x)};${this.#round(this.a.y)}), B(${this.#round(this.b.x)};${this.#round(this.b.y)}), C(${this.#round(this.c.x)};${this.#round(this.c.y)})`
    checkIfValid = () => this.#length(this.a, this.b) + this.#length(this.b, this.c) > this.#length(this.c, this.a)
        && this.#length(this.b, this.c) + this.#length(this.c, this.a) > this.#length(this.a, this.b)
        && this.#length(this.c, this.a) + this.#length(this.a, this.b) > this.#length(this.b, this.c)

    getArea = () => {
        if (!this.a.x)
            return 0

        let A = this.#length(this.a, this.b)
        let B = this.#length(this.b, this.c)
        let C = this.#length(this.c, this.a)

        let p = (A + B + C) / 2
        return Math.sqrt(p * (p - A) * (p - B) * (p - C))
    }
}