class GeometryManager {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.SCALING_RATE = 25
        this.scale = this.cellDimension = this.minX = this.minY = this.maxX = this.maxY = this.middleX = this.middleY = this.xQuantity = this.yQuantity
    }

    drawGrid = (minX, maxX, minY, maxY, width = this.width, height = this.height) => {
        push()
        if (minX > maxX || minY > maxY)
            return

        this.minX = minX
        this.minY = minY
        this.maxX = maxX < 1 ? 1 : maxX
        this.maxY = maxY < 1 ? 1 : maxY
        this.width = width
        this.height = height
        strokeWeight(2)
        stroke('rgb(224, 224, 224)')

        this.cellDimension = min(width / (this.maxX - this.minX + 4), height / (this.maxY - this.minY + 4)) * 0.95
        this.xQuantity = Math.ceil(width / this.cellDimension - 1)
        this.yQuantity = Math.ceil(height / this.cellDimension - 1)
        this.scale = max(int(this.xQuantity / this.SCALING_RATE) + 1, int(this.yQuantity / this.SCALING_RATE) + 1)

        let passedMiddle = false, foundPlace = false
        for (let x = 2; x < this.xQuantity; x += this.scale) {
            for (let i = 0; i != this.scale; ++i) {
                passedMiddle ||= x - i === Math.floor(this.xQuantity / 2)
            }
            foundPlace ||= (x + 2) >= Math.abs(this.maxX) && (this.xQuantity - 2) > Math.abs(this.minX)
            if (foundPlace && passedMiddle) {
                this.middleX = x
                passedMiddle = foundPlace = false
                continue
            }
            new Stroke(
                new Point(this.getX(x), this.cellDimension),
                new Point(this.getX(x), height - this.cellDimension),
            ).draw()
        }
        passedMiddle = foundPlace = false
        for (let y = 2; y < this.yQuantity; y += this.scale) {
            for (let i = 0; i != this.scale; ++i) {
                passedMiddle ||= y - i === Math.floor(this.yQuantity / 2)
            }
            foundPlace ||= (y + 2) >= Math.abs(this.maxY) && (this.yQuantity - 2) > Math.abs(this.minY)
            if (foundPlace && passedMiddle) {
                this.middleY = y
                passedMiddle = foundPlace = false
                continue
            }

            new Stroke(
                new Point(this.cellDimension, this.getY(y)),
                new Point(width - this.cellDimension, this.getY(y)),
            ).draw()
        }

        const NUMBER_LINE_DASH_DIVISOR = 5
        const TEXT_SIZE = 14
        textSize(TEXT_SIZE);
        stroke('black')
        for (let x = 2; x < this.xQuantity; x += this.scale) {
            if (x === this.middleX) {
                console.log(this.middleX)
                new Stroke(
                    new Point(this.getX(this.middleX), this.cellDimension),
                    new Point(this.getX(this.middleX), height - this.cellDimension),
                ).draw()
                fill('black')
                triangle(this.getX(this.middleX) - 7.5, this.cellDimension, this.getX(this.middleX) + 7.5, this.cellDimension, this.getX(this.middleX), this.cellDimension - 15);
            }

            new Stroke(
                new Point(this.getX(x), this.getY(this.middleY) - this.cellDimension / NUMBER_LINE_DASH_DIVISOR),
                new Point(this.getX(x), this.getY(this.middleY) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR),
            ).draw()

            if (x !== this.middleX) {
                strokeWeight(1);
                text(x - this.middleX, this.getX(x) - TEXT_SIZE / 3, this.getY(this.middleY) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR * Math.ceil(this.xQuantity / 8.75))
            }
            strokeWeight(2);
        }

        for (let y = 2; y < this.yQuantity; y += this.scale) {
            if (y === this.middleY) {
                new Stroke(
                    new Point(this.cellDimension, this.getY(this.middleY)),
                    new Point(width - this.cellDimension + 5, this.getY(this.middleY)),
                ).draw()
                fill('black')
                triangle(width - this.cellDimension + 5, this.getY(this.middleY) + 7.5, width - this.cellDimension + 5, this.getY(this.middleY) - 7.5, width - this.cellDimension + 20, this.getY(this.middleY));
            }

            new Stroke(
                new Point(this.getX(this.middleX) - this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.getY(y)),
                new Point(this.getX(this.middleX) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR, this.getY(y)),
            ).draw()

            if (y !== this.middleY) {
                strokeWeight(1);
                text(this.middleY - y, this.getX(this.middleX) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR * 1.5, this.getY(y) + TEXT_SIZE / 4)
                strokeWeight(2);
            } else {
                strokeWeight(1);
                text(y - this.middleY, this.getX(this.middleX) + this.cellDimension / NUMBER_LINE_DASH_DIVISOR / 2, this.getY(y) + TEXT_SIZE)
                strokeWeight(2);
            }
        }
        pop()
    }

    getX = (x) => (x < 2 || x > this.xQuantity) ? 0 : this.cellDimension * x
    getY = (y) => (y < 2 || y > this.yQuantity) ? 0 : this.cellDimension * y
    getCellX = (x) => (x < this.minX || x > this.maxX) ? 0 : this.cellDimension * this.middleX + this.cellDimension * x
    getCellY = (y) => (y < this.minY || y > this.maxY) ? 0 : this.cellDimension * this.middleY + this.cellDimension * y
    getCellPos = (x, y) => [this.getCellX(x), this.getCellY(y)]

    drawTriangle = (aX, aY, bX, bY, cX, cY) => {

    }

    drawTriangle = (a, b, c) => {
        this.drawTriangle(a.x, a.y, b.x, b.y, c.x, c.y)
    }

    rotateAndTranslate = () => {

    }
}