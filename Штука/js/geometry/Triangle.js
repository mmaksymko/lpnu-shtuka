class Triangle {
    constructor(aX = null, aY = null, bX = null, bY = null, cX = null, cY = null) {
        this.a = new Point(aX, aY)
        this.b = new Point(bX, bY)
        this.c = new Point(cX, cY)
    }

    mirror = () => {
        this.a.x *= -1
        this.a.y *= -1
        this.b.x *= -1
        this.b.y *= -1
        this.c.x *= -1
        this.c.y *= -1
    }

    #dist = (a, b) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)

    getTriangleArea = () => {
        if (!this.a.x)
            return 0

        let a = this.#dist(aX, aY, bX, bY)
        let b = this.#dist(bX, bY, cX, cY)
        let c = this.#dist(cX, cY, aX, aY)
        let p = (a + b + c) / 2
        return Math.sqrt(p * (p - a) * (p - b) * (p - c))
    }

}