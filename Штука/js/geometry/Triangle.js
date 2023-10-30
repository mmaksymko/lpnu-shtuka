class Triangle {
    constructor(aX = null, aY = null, bX = null, bY = null, cX = null, cY = null) {
        this.a = new Point(aX, aY)
        this.b = new Point(bX, bY)
        this.c = new Point(cX, cY)
        if (!this.checkIfValid())
            throw new Error('Трикутника з такими точками не може існувати!');
    }

    mirror = () => {
        this.a.x *= -1
        this.a.y *= -1
        this.b.x *= -1
        this.b.y *= -1
        this.c.x *= -1
        this.c.y *= -1
    }

    checkIfValid = () => this.#length(this.a, this.b) + this.#length(this.b, this.c) > this.#length(this.c, this.a)
        && this.#length(this.b, this.c) + this.#length(this.c, this.a) > this.#length(this.a, this.b)
        && this.#length(this.c, this.a) + this.#length(this.a, this.b) > this.#length(this.b, this.c)

    #length = (A, B) => Math.hypot(A.x - B.x, A.y - B.y)
    #round = (num) => Math.round((num + Number.EPSILON) * 100) / 100

    getArea = (scalingFactor = 1) => {
        if (!this.a.x)
            return 0

        let A = this.#length(this.a, this.b)
        let B = this.#length(this.b, this.c)
        let C = this.#length(this.c, this.a)

        let p = (A + B + C) / 2
        return Math.sqrt(p * (p - A) * (p - B) * (p - C)) * scalingFactor
    }

    toString = (scalingFactor = 1) => `A(${this.#round(this.a.x * scalingFactor)};${this.#round(this.a.y * scalingFactor)}), B(${this.#round(this.b.x * scalingFactor)};${this.#round(this.b.y * scalingFactor)}), C(${this.#round(this.c.x * scalingFactor)};${this.#round(this.c.y * scalingFactor)})`
}