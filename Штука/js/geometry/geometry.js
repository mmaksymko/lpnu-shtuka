
let cnv
let canvas = document.getElementById("canvas")

let geometryManager

let minX, minY, maxX, maxY
minX = minY = -5
maxY = maxX = 5
let onResize = () => {
    let [width, height] = [canvas.clientWidth, canvas.clientHeight]
    resizeCanvas(width, height);
    clear()
    geometryManager.drawGrid(minX, maxX, minY - 1, maxY + 1, width, height)
};
window.addEventListener("resize", onResize);

function setup() {
    geometryManager = new GeometryManager(canvas.clientWidth, canvas.clientHeight)
    cnv = createCanvas(geometryManager.width, geometryManager.height, {
        willReadFrequently: true
    });

    background(255);
    cnv.parent('canvas');
}

function draw() {
    onResize()
    noLoop()
}

document.getElementById('scale-down-button').addEventListener('click', () => {
    [minX, maxX, minY, maxY] = [geometryManager.min.x, geometryManager.max.x, geometryManager.min.y, geometryManager.max.y]

    minX -= geometryManager.scale
    maxX += geometryManager.scale
    minY -= geometryManager.scale
    maxY += geometryManager.scale

    onResize()
})

document.getElementById('scale-up-button').addEventListener('click', () => {
    for (let i = 0; i < geometryManager.scale; ++i) {
        if (maxX - minX - 1 != 0) {
            minX += 1
            if (maxX - minX - 1 != 0) {
                maxX -= 1
            }
        }
        if (maxY - minY - 1 != 0) {
            minY += 1
            if (maxY - minY - 1 != 0) {
                maxY -= 1
            }
        }
    }
    onResize()
})

document.getElementById('generate-triangle-button').addEventListener('click', () => {
    let inputs = [20, 10, 1, 5, 3, 7]
    geometryManager.scalingFactor = 1
    geometryManager.drawTriangle(new Triangle(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5]))
    scaleToFit()
    onResize()
    return
    // let inputs = document.getElementsByClassName("triangle-axis-point")
    for (let input of inputs)
        if (!input.value)
            return
    geometryManager.drawTriangle(new Triangle(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value))
    onResize()
})

document.getElementById('translate-button').addEventListener('click', (e) => {
    if (document.getElementById('triangle-scale').value && document.getElementById('triangle-scale').value > 0)
        geometryManager.mirrorAndScale(document.getElementById('triangle-scale').value)
    scaleToFit()
})

document.getElementById('save-button').addEventListener('click', () => saveCanvas(cnv, 'myCanvas', 'png'))

document.getElementById('geometry-help-button').addEventListener('click', () => {

})

scaleToFit = () => {
    let maxX = Math.max(geometryManager.triangle.a.x, geometryManager.triangle.b.x, geometryManager.triangle.c.x) * geometryManager.scalingFactor
    let maxY = Math.max(geometryManager.triangle.a.y, geometryManager.triangle.b.y, geometryManager.triangle.c.y) * geometryManager.scalingFactor
    let minX = Math.min(geometryManager.triangle.a.x, geometryManager.triangle.b.x, geometryManager.triangle.c.x) * geometryManager.scalingFactor
    let minY = Math.min(geometryManager.triangle.a.y, geometryManager.triangle.b.y, geometryManager.triangle.c.y) * geometryManager.scalingFactor
    while (geometryManager.maxVisible.x < maxX || geometryManager.maxVisible.y < maxY || geometryManager.minVisible.x > minX || geometryManager.minVisible.y > minY) {
        document.getElementById('scale-down-button').click()
    }
}
