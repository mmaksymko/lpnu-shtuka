class Triangle {
    constructor(aX = null, aY = null, bX = null, bY = null, cX = null, cY = null) {
        this.a = new Point(aX, aY)
        this.b = new Point(bX, bY)
        this.c = new Point(cX, cY)
        if (!this.checkIfValid())
            throw new Error('Трикутника з такими точками не може існувати!');
    }

    transform(matrix) {
        this.a = Point.fromVector(GeometryManager.multiplyMatrices(this.a.getAsVector(), matrix))
        this.b = Point.fromVector(GeometryManager.multiplyMatrices(this.b.getAsVector(), matrix))
        this.c = Point.fromVector(GeometryManager.multiplyMatrices(this.c.getAsVector(), matrix))
    }

    mirror = () => this.transform([[-1, 0], [0, -1]])
    scale = (xScale, yScale = xScale) => this.transform([[xScale, 0], [0, yScale]])

    #length = (A, B) => Math.hypot(A.x - B.x, A.y - B.y)
    #round = (num) => Number.parseFloat(num).toFixed(2);

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