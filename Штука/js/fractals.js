p5.disableFriendlyErrors = true

clearCanvas = () => {
    clear()
    dragonCurve.strokes.length = 0
    onResize()
}

let dragonSlider = document.getElementById('dragonSlider')
let dragonSliderValueElement = document.getElementById('dragonValue')

dragonSliderValueElement.innerHTML = dragonSlider.value
dragonSlider.addEventListener('input', () => {
    dragonSliderValueElement.innerHTML = dragonSlider.value
    clearCanvas()
})

let juliaSlider = document.getElementById('juliaSlider')
let juliaSliderValueElement = document.getElementById('juliaValue')

juliaSliderValueElement.innerHTML = juliaSlider.value - -290
juliaSlider.addEventListener('input', () => {
    juliaSliderValueElement.innerHTML = juliaSlider.value - -310
    clearCanvas()
})


let dragonCurve = new DragonCurve()
let juliaFractal = new JuliaFractal()
let isDragon = true
let length

let cnv
let canvas = document.getElementById("canvas")
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;

let firstResize = true
let onResize = () => {
    canvasWidth = canvas.clientWidth;
    canvasHeight = firstResize ? canvas.clientHeight - 5 : canvas.clientHeight;
    firstResize = false
    resizeCanvas(canvasWidth, canvasHeight > 445 ? 445 : canvasHeight);
};

function setup() {
    cnv = createCanvas(canvasWidth, canvasHeight, {
        willReadFrequently: true
    });
    pixelDensity(1)
    cnv.parent('canvas');
    addEventListener("resize", onResize);

    onResize();
    onResize();
}

function draw() {
    background(255);
    strokeWeight(3)
    stroke('crimson')

    startPoint = new Point(canvasWidth / 2 - canvasWidth / 4.75, 180)
    length = 2

    if (canvasWidth < 500) {
        length = 1.35
    }

    noLoop()
    if (isDragon)
        dragonCurve.draw(startPoint.x, startPoint.y, dragonSlider.value, length);
    else {
        juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value)
    }
}


for (element of document.getElementsByClassName('save-fractal')) {
    element.addEventListener('click', () => saveCanvas(cnv, 'myCanvas', 'png'))
}

let juliaFractalButton = document.getElementById('julia-fractal-button')
let dragonCurveButton = document.getElementById('dragon-curve-button')
let dragonCurveParameters = document.getElementById('dragon-curve-parameters')
let juliaFractalParameters = document.getElementById('julia-fractal-parameters')

juliaFractalButton.addEventListener('click', (event) =>
    hideFractal(event.target, dragonCurveButton, false, juliaFractalParameters, dragonCurveParameters)
)

dragonCurveButton.addEventListener('click', (event) =>
    hideFractal(event.target, juliaFractalButton, true, dragonCurveParameters, juliaFractalParameters)
)

hideFractal = (toggleActive, toggleUnactive, isDragonValue, parametersActive, parametersUnactive) => {
    toggleActive.classList.add('active')
    toggleUnactive.classList.remove('active')
    isDragon = isDragonValue;
    parametersActive.style.display = 'block';
    parametersUnactive.style.display = 'none';
    clearCanvas();
}


let real = document.getElementById('julia-constant-real')
let imaginary = document.getElementById('julia-constant-imaginary')
real.addEventListener('input', (event) => {
    juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value)
})
imaginary.addEventListener('input', (event) => {
    juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value)
})

document.getElementsByClassName('random-button')[0].addEventListener('click', () => {
    [real.value, imaginary.value] = juliaFractal.getRandomValues()
    console.log(real.value, imaginary.value);
    clearCanvas();

})


document.getElementById('julia-primary-color').addEventListener('input', (event) => {
    juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value)
})

document.getElementById('color-scheme-select').addEventListener('change', (event) => {
    juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value)
})


document.getElementById('fractal-help-button').addEventListener('click', () => {
    document.getElementsByClassName('page-container')[0].style.display = 'none'
    if (isDragon) {
        document.getElementsByClassName('dragon-help-container')[0].style.display = 'flex'
    } else {
        document.getElementsByClassName('julia-help-container')[0].style.display = 'flex'
    }
})

document.getElementById('exit-dragon-help-button').addEventListener('click', () => {
    document.getElementsByClassName('page-container')[0].style.display = 'flex'
    document.getElementsByClassName('dragon-help-container')[0].style.display = 'none'
})

document.getElementById('exit-julia-help-button').addEventListener('click', () => {
    document.getElementsByClassName('page-container')[0].style.display = 'flex'
    document.getElementsByClassName('julia-help-container')[0].style.display = 'none'
})