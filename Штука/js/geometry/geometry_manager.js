class GeometryManager {
    constructor(width, height) {
        this.SCALING_RATE = 25
        this.scale = this.cellDimension = null
        this.min = new Point(null, null)
        this.max = new Point(null, null)
        this.middle = new Point(null, null)
        this.minVisible = new Point(null, null)
        this.maxVisible = new Point(null, null)
        this.quantity = new Point(null, null)
        this.resolution = new Point(width, height)
        this.PADDING = 15
        this.scaling = this.scalingFactor = 1
        this.triangle = null
    }

    drawGrid = (minX = this.min.x, maxX = this.max.x, minY = this.min.y, maxY = this.max.y, width = this.resolution.x, height = this.resolution.y) => {
        if (min.x > max.x || min.y > max.y)
            return
        clear()
        background('white')
        this.min.x = minX
        this.max.x = maxX
        this.min.y = minY
        this.max.y = maxY
        this.resolution.x = width
        this.resolution.y = height
        strokeWeight(2)
        stroke('rgb(224, 224, 224)')

        this.cellDimension = Math.min(this.resolution.x / (this.max.x - this.min.x + 4), this.resolution.y / (this.max.y - this.min.y + 4)) * 0.95
        this.quantity.x = Math.ceil((this.resolution.x - 2 * this.PADDING) / this.cellDimension - 1)
        this.quantity.y = Math.ceil((this.resolution.y - 2 * this.PADDING) / this.cellDimension - 1)
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

        const NUMBER_LINE_DASH_DIVISOR = 5
        const TEXT_SIZE = 14
        stroke('black')

        this.maxVisible.x = this.quantity.x - 1 - this.middle.x;
        this.minVisible.x = 2 - this.middle.x;
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
                if (this.minVisible.x - 2 < -1000)
                    textSize(TEXT_SIZE / 1.25)
                if (this.minVisible.x - 2 < -10000)
                    textSize(TEXT_SIZE / 1.5)
                if (this.minVisible.x - 2 < -100000)
                    textSize(TEXT_SIZE / 1.75)
                if (this.minVisible.x - 2 < -1000000)
                    textSize(TEXT_SIZE / 2)
                text(x - this.middle.x, this.#getXCoordinate(x) - TEXT_SIZE / 3, this.#getYCoordinate(this.middle.y) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR * Math.ceil(this.quantity.x / 8.75))
            }
            strokeWeight(2);
        }

        this.maxVisible.y = this.middle.y - 2;
        this.minVisible.y = this.middle.y - this.quantity.y + 1;
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

                if (this.minVisible.y - 2 < -1000000)
                    textSize(TEXT_SIZE / 2)
                else if (this.minVisible.y - 2 < -100000)
                    textSize(TEXT_SIZE / 1.75)
                else if (this.minVisible.y - 2 < -10000)
                    textSize(TEXT_SIZE / 1.75)
                else textSize(TEXT_SIZE / 1.25)

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
        if (this.triangle) {
            push()
            this.scaling = this.scalingFactor
            scale(this.scaling, this.scaling)
            this.drawTriangle()
            this.scaling = 1
            pop()
            strokeWeight(1);
            stroke('black')
            textSize(TEXT_SIZE / 1.25);
            text(this.triangle.toString(this.scalingFactor), this.PADDING, this.PADDING)
        }
    }

    #addXPadding = (x) => (x + this.PADDING * 1.25) / this.scaling
    #addYPadding = (y) => (y + this.PADDING * 1.5) / this.scaling
    #getXCoordinate = (x) => this.#addXPadding(this.cellDimension * x)
    #getYCoordinate = (y) => this.#addYPadding(this.cellDimension * y)
    #getCellX = (x) => this.#getXCoordinate(this.middle.x) + this.cellDimension * x
    #getCellY = (y) => this.#getYCoordinate(this.middle.y) - this.cellDimension * y

    drawTriangle = (tri = this.triangle) => {
        push()

        strokeWeight(2);
        stroke(53, 130, 15)
        fill(53, 130, 15, 30)
        this.triangle = tri

        let scale = 2 / this.scaling
        strokeWeight(scale);
        triangle(this.#getCellX(tri.a.x), this.#getCellY(tri.a.y), this.#getCellX(tri.b.x), this.#getCellY(tri.b.y), this.#getCellX(tri.c.x), this.#getCellY(tri.c.y))

        strokeWeight(scale * 4);
        point(this.#getCellX(tri.a.x), this.#getCellY(tri.a.y))
        point(this.#getCellX(tri.b.x), this.#getCellY(tri.b.y))
        point(this.#getCellX(tri.c.x), this.#getCellY(tri.c.y))
        pop()
    }

    mirrorAndScale = (scaleFactor) => {
        if (!this.triangle)
            return

        clear()
        this.scalingFactor *= scaleFactor
        this.triangle.mirror()
        this.drawGrid()
    }
}