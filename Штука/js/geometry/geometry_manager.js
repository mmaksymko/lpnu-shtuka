class GeometryManager {
    constructor(width, height) {
        this.SCALING_RATE = 25
        this.scale = this.cellDimension = this.triangle = null
        this.middle = new Point(null, null)
        this.PADDING = 15
    }

    drawGrid = (minX = this.min.x, maxX = this.max.x, minY = this.min.y, maxY = this.max.y, width = this.resolution.x, height = this.resolution.y) => {
        if (minX > maxX || minY > maxY)
            return
        clear()
        background('white')
        this.min = new Point(minX, minY)
        this.max = new Point(maxX, maxY)
        this.resolution = new Point(width, height)
        strokeWeight(2)
        stroke('rgb(224, 224, 224)')

        this.cellDimension = Math.min(this.resolution.x / (this.max.x - this.min.x + 4), this.resolution.y / (this.max.y - this.min.y + 4)) * 0.95
        this.quantity = new Point(Math.ceil((this.resolution.x - 2 * this.PADDING) / this.cellDimension - 1), Math.ceil((this.resolution.y - 2 * this.PADDING) / this.cellDimension - 1))
        this.scale = Math.max(int(this.quantity.x / this.SCALING_RATE) + 1, int(this.quantity.y / this.SCALING_RATE) + 1)

        let passedMiddle = false, foundPlace = false
        for (let x = 2; x < this.quantity.x; x += this.scale) {
            //визначення центру
            for (let i = 0; i != this.scale; ++i) {
                passedMiddle ||= x - i === Math.floor(this.quantity.x / 2)
            }
            foundPlace ||= (x + 2) >= Math.abs(this.max.x) && (this.quantity.x - 2) > Math.abs(this.min.x)
            if (foundPlace && passedMiddle) {
                this.middle.x = x
                passedMiddle = foundPlace = false
                continue
            }
            new Stroke(
                new Point(this.#getXCoordinate(x), this.#getXCoordinate(0)),
                new Point(this.#getXCoordinate(x), this.resolution.y - this.PADDING * 0.75),
            ).draw()
        }
        passedMiddle = foundPlace = false
        for (let y = 2; y < this.quantity.y; y += this.scale) {
            for (let i = 0; i != this.scale; ++i) {
                passedMiddle ||= y - i === Math.floor(this.quantity.y / 2)
            }
            foundPlace ||= (y + 2) >= Math.abs(this.max.y) && (this.quantity.y - 2) > Math.abs(this.min.y)
            if (foundPlace && passedMiddle) {
                this.middle.y = y
                passedMiddle = foundPlace = false
                continue
            }

            new Stroke(
                new Point(Math.max(this.cellDimension, this.PADDING * 0.5), this.#getYCoordinate(y)),
                new Point(Math.min(this.resolution.x - this.cellDimension, this.resolution.x - this.PADDING * 0.5), this.#getYCoordinate(y)),
            ).draw()
        }
        this.maxVisible = new Point(this.quantity.x - 1 - this.middle.x, this.middle.y - 2)
        this.minVisible = new Point(2 - this.middle.x, this.middle.y - this.quantity.y + 1);

        const NUMBER_LINE_DASH_DIVISOR = 5
        const TEXT_SIZE = 14
        stroke('black')

        let text_size = this.minVisible.y - 2 < -1000000 ? TEXT_SIZE / 2 : this.minVisible.y - 2 < -100000 ? TEXT_SIZE / 1.75 : this.minVisible.y - 2 < -10000 ? TEXT_SIZE / 1.5 : TEXT_SIZE / 1.25
        for (let x = 2; x < this.quantity.x; x += this.scale) {
            textSize(TEXT_SIZE);
            if (x === this.middle.x) {
                new Stroke(
                    new Point(this.#getXCoordinate(this.middle.x), this.cellDimension),
                    new Point(this.#getXCoordinate(this.middle.x), this.resolution.y - this.cellDimension),
                ).draw()
                fill('black')
                triangle(this.#getXCoordinate(this.middle.x) - this.PADDING / 2, Math.max(this.cellDimension, this.PADDING), this.#getXCoordinate(this.middle.x) + this.PADDING / 2, Math.max(this.cellDimension, this.PADDING), this.#getXCoordinate(this.middle.x), Math.max(this.cellDimension - this.PADDING, 0));
                strokeWeight(1)
                textSize(20)
                text('y', this.#getXCoordinate(this.middle.x) - this.PADDING * 1.35, Math.max(this.cellDimension, this.PADDING - 2.5))
                strokeWeight(2);
            }

            new Stroke(
                new Point(this.#getXCoordinate(x), this.#getYCoordinate(this.middle.y) - Math.max(this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.PADDING / 2.5)),
                new Point(this.#getXCoordinate(x), this.#getYCoordinate(this.middle.y) + Math.max(this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.PADDING / 2.5)),
            ).draw()

            if (x !== this.middle.x) {
                strokeWeight(1);
                textSize(text_size)
                text(x - this.middle.x, this.#getXCoordinate(x) - TEXT_SIZE / 3, this.#getYCoordinate(this.middle.y) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR * Math.ceil(this.quantity.x / 8.75))
            }
            strokeWeight(2);
        }

        for (let y = 2; y < this.quantity.y; y += this.scale) {
            textSize(TEXT_SIZE);
            if (y === this.middle.y) {
                new Stroke(
                    new Point(this.cellDimension, this.#getYCoordinate(this.middle.y)),
                    new Point(this.resolution.x - this.cellDimension + 5, this.#getYCoordinate(this.middle.y)),
                ).draw()
                fill('black')

                triangle(Math.min(this.resolution.x - this.cellDimension, this.resolution.x - this.PADDING), this.#getYCoordinate(this.middle.y) + this.PADDING / 2, Math.min(this.resolution.x - this.cellDimension, this.resolution.x - this.PADDING), this.#getYCoordinate(this.middle.y) - this.PADDING / 2, Math.min(this.resolution.x - this.cellDimension + this.PADDING, this.resolution.x), this.#getYCoordinate(this.middle.y));
                strokeWeight(1)
                textSize(20)
                text('x', Math.min(this.resolution.x - this.cellDimension, this.resolution.x - this.PADDING), this.#getYCoordinate(this.middle.y) - this.PADDING * 0.75)
                strokeWeight(2);
            }

            new Stroke(
                new Point(this.#getXCoordinate(this.middle.x) - Math.max(this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.PADDING / 2.5), this.#getYCoordinate(y)),
                new Point(this.#getXCoordinate(this.middle.x) + Math.max(this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.PADDING / 2.5), this.#getYCoordinate(y)),
            ).draw()

            if (y !== this.middle.y) {
                strokeWeight(1);
                textSize(text_size)
                text(' ' + this.middle.y - y, this.#getXCoordinate(this.middle.x) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR + 8, this.#getYCoordinate(y) + TEXT_SIZE / 4)
                strokeWeight(2);
            } else {
                strokeWeight(8);
                point(this.#getXCoordinate(this.middle.x), this.#getYCoordinate(this.middle.y))
                strokeWeight(1);
                textSize(TEXT_SIZE + 2);
                text(y - this.middle.y, this.#getXCoordinate(this.middle.x) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR / 2 + 1, this.#getYCoordinate(y) + TEXT_SIZE * 1.35)
                strokeWeight(2);
            }
        }
        textSize(TEXT_SIZE / 1.25);
        if (this.triangle) {
            this.drawTriangle()
            strokeWeight(1);
            stroke('black')
            text(this.triangle.toString(), this.PADDING, this.PADDING)
            text(this.triangle.toMatrixString(), this.PADDING, height - this.PADDING * 2.5)
        }
    }

    #addXPadding = (x) => (x + this.PADDING * 1.25)
    #addYPadding = (y) => (y + this.PADDING * 1.5)
    #getXCoordinate = (x) => this.#addXPadding(this.cellDimension * x)
    #getYCoordinate = (y) => this.#addYPadding(this.cellDimension * y)
    #getCellX = (x) => this.#getXCoordinate(this.middle.x) + this.cellDimension * x
    #getCellY = (y) => this.#getYCoordinate(this.middle.y) - this.cellDimension * y

    drawTriangle = (tri = this.triangle) => {
        strokeWeight(2);
        stroke(53, 130, 15)
        fill(53, 130, 15, 30)
        this.triangle = tri

        let scale = 2
        strokeWeight(scale);
        triangle(this.#getCellX(tri.a.x), this.#getCellY(tri.a.y), this.#getCellX(tri.b.x), this.#getCellY(tri.b.y), this.#getCellX(tri.c.x), this.#getCellY(tri.c.y))

        strokeWeight(scale * 4);
        point(this.#getCellX(tri.a.x), this.#getCellY(tri.a.y))
        point(this.#getCellX(tri.b.x), this.#getCellY(tri.b.y))
        point(this.#getCellX(tri.c.x), this.#getCellY(tri.c.y))
    }

    mirrorAndScale = (scaleFactor) => {
        if (!this.triangle)
            return

        clear()
        this.triangle.mirror()
        this.triangle.scale(scaleFactor)
        this.drawGrid()
    }

    static multiplyMatrices = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((acc, _, n) => acc + a[i][n] * b[n][j], 0)))

    #triangles = [
        [-20, 30, 10, -40, 50, 10], [-60, -70, 0, 60, 70, -20], [-80, 20, 0, -90, 80, 40], [-30, 50, 30, 50, 0, -60], [-10, 20, 40, 10, -30, -50], [-50, -30, 60, 50, 20, -40], [-70, 40, 0, -30, 30, 60],
        [-40, 10, 0, -80, 40, 50], [-10, 60, 10, -20, 0, 40], [-20, 0, 50, -50, -30, 70], [-80, -60, 60, -80, 20, 30], [-50, 80, 50, 80, 0, -90], [-70, 20, 70, 20, 0, -100], [-30, -20, 30, -20, 0, 80], [-20, -90, 40, 30, -60, 60],
        [-50, 70, 30, -50, 20, 10], [-90, 10, 0, 90, 90, -70], [-60, 40, 60, 40, 0, 20], [-80, 50, 20, -30, 60, 70], [-10, -50, 30, 70, -20, 0], [-30, -40, 70, 60, -40, -60], [-80, -10, 80, 90, 0, -30], [-70, -90, 90, 50, -20, 30],
        [-30, 0, 0, -50, 30, 80], [-20, 50, 20, -70, 0, 30], [-40, 40, 40, -50, 0, 90], [-10, -30, 60, 80, -50, -10], [-60, -20, 60, -20, 0, 100], [-50, -40, 50, -40, 0, 50], [-90, 30, 0, -10, 90, 60], [-70, -50, 90, 70, -20, 20],
        [-80, 80, 20, -80, 60, 10], [-10, -70, 20, 40, -30, -10], [-40, -20, 60, -90, -20, 50], [-90, -30, 90, -30, 0, -80], [-40, 0, 40, 0, 0, -40], [-60, 30, 60, 30, 0, 10], [-80, -50, 20, 70, 60, -10], [-90, -60, 90, -60, 0, -10],
        [-30, 10, 0, 80, 30, -70], [-20, -80, 40, 40, -20, 20], [-50, 60, 50, 60, 0, -30], [-70, 80, 70, 80, 0, 40], [-10, -20, 50, -70, -40, 50], [-50, -10, 50, -10, 0, -100], [-60, -80, 60, -80, 0, -50], [-20, -30, 20, -30, 0, 60], [-30, 90, 90, -50, -60, 10], [-70, -40, 70, -40, 0, 90],
    ];

    getRandomTriangle = () => this.#triangles[Math.floor(Math.random() * this.#triangles.length)];
}