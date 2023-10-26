class DragonCurve {

    constructor() {
        this.strokes = [];
    }

    rotationsCode = iterations => {
        let rotations = [""];
        // непарні повороти - R та L по черзі
        for (let i = 1; i < Math.pow(2, iterations - 2) + 1; i++) {
            rotations = rotations.concat(["R", "", "L", ""]);
        }
        // кожен парний n поворот такий ж, як і n/2 
        for (let i = 1; i < Math.pow(2, iterations - 1); i++) {
            rotations[2 * i] = rotations[i];
        }
        return rotations.slice(1, -1).join("");
    }

    draw = (x, y, iterations, length) => {
        push()

        let stroke = new Stroke(
            new Point(x, y),
            new Point(x, y - length),
        )
        translate(x, y - length)
        stroke.draw()
        this.strokes.push(stroke)

        let res = iterations >= 2 ? this.rotationsCode(iterations) : ['R']

        for (let i = 0; i != res.length; ++i) {
            let startPoint = this.strokes[this.strokes.length - 1].endPoint
            translate(startPoint.x, startPoint.y)
            if (res[i] === 'R') {
                rotate(3 * PI / 2)
            } else {
                rotate(PI / 2)
            }

            let stroke = new Stroke(
                new Point(0, 0),
                new Point(0 - length, 0),
            )
            stroke.draw()
            this.strokes.push(stroke)
        }
        pop()
    }
}