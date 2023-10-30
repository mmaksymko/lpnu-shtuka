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

    #dist = (A, B) => Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)

    getArea = () => {
        if (!this.a.x)
            return 0

        let A = Math.sqrt((this.b.x - this.a.x) ** 2 + (this.b.y - this.a.y) ** 2)
        let B = Math.sqrt((this.b.x - this.c.x) ** 2 + (this.b.y - this.c.y) ** 2)
        let C = Math.sqrt((this.c.x - this.a.x) ** 2 + (this.c.y - this.a.y) ** 2)

        let p = (A + B + C) / 2
        return Math.sqrt(p * (p - A) * (p - B) * (p - C))
    }

}