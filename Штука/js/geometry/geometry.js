
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
    console.log(`${minX} ${maxX} ${minY} ${maxY}`);

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
    minX -= 2
    minY -= 2
    // maxX -= 2
    // maxY -= 2
    onResize()
})
document.getElementById('scale-up-button').addEventListener('click', () => {
    // minX += 2
    // minY += 2
    maxX += 2
    maxY += 2
    console.log(`${minX} ${maxX} ${minY} ${maxY}`);
    onResize()
})