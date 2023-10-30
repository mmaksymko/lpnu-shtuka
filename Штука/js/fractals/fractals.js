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
let canvasResolution = new Point(canvas.clientWidth, canvas.clientHeight)

let firstResize = true
let onResize = () => {
    canvasResolution.x = canvas.clientWidth;
    canvasResolution.y = firstResize ? canvas.clientHeight - 5 : canvas.clientHeight;
    firstResize = false
    resizeCanvas(canvasResolution.x, Math.min(canvasResolution.y, 445));
};

function setup() {
    cnv = createCanvas(canvasResolution.x, canvasResolution.y, {
        willReadFrequently: true
    });
    pixelDensity(1)
    cnv.parent('canvas');
    addEventListener("resize", onResize);
    onResize();
}

function draw() {
    background(255);
    strokeWeight(3)
    stroke('crimson')

    startPoint = new Point(canvasResolution.x / 2 - canvasResolution.x / 4.75, 180)
    length = 2

    if (canvasResolution.x < 500) {
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
real.addEventListener('input', () => juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value))
imaginary.addEventListener('input', (event) => juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value))

document.getElementsByClassName('random-button')[0].addEventListener('click', () => {
    [real.value, imaginary.value] = juliaFractal.getRandomValues()
    clearCanvas();
})
document.getElementById('julia-primary-color').addEventListener('input', (event) => juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value))
document.getElementById('color-scheme-select').addEventListener('change', (event) => juliaFractal.draw(width, height, 150, parseFloat(real.value), parseFloat(imaginary.value), 0.02 * juliaSlider.value, ColorsManager.hexToRGB(document.getElementById('julia-primary-color').value.slice(1, 7)), document.getElementById('color-scheme-select').value))


window.addEventListener("load", (event) => {
    let dragonHelp = new HelpBuilder(document.querySelector('body'), document.getElementsByClassName('page-container')[0])
        .addPage(``)
        .addText(`<b>Демонстрація</b>`)
        .addDemonstartion('./img/fractals_demo.gif')
        .addNavigation()
        .addPage(`Хочеш дізнатись більше інформації про фрактал? <b><u><a href="https://larryriddle.agnesscott.org/ifs/heighway/heighway.htm">Тисни!</a></u></b>`)
        .addText(`<b>Крива дракона</b> <i>(також відома як фрактал <b>Гартера-Гейвея</b>)</i> - фрактал, який зображається
            наступним чином: починаючи з <b>базового сегмента</b>, кожен сегмент <b>замінюється</b> двома сегментами
            з <b>прямим кутом</b> і з обертанням <b>на 45°</b>, альтернативно, праворуч і ліворуч.`)
        .addImage('./img/dragonCurve1.png', 'dragon curve illustration')
        .addText(`Гейвей сконструював цей фрактал у <b>1967</b>, працюючи в <b>NASA</b> наступним чином: склав довгу
            полоску паперу <b>навпіл</b>, <b>знову</b> в тім ж напрямку і так <b>n разів</b>. Розкривши зігнутий
            папір так, що всі згини під <b>прямим кутом</b> він отримав <b>дракона n-ного порядку</b>.`)
        .addImages(['./img/dragonCurve2.png', './img/dragonCurve3.png'], ['dragon curve real-life illustration pt.1', 'dragon curve real-life illustration pt.2'])
        .addNavigation()
        .build()
    let juliaHelp = new HelpBuilder(document.querySelector('body'), document.getElementsByClassName('page-container')[0])
        .addPage(``)
        .addText(`<b>Демонстрація</b>`)
        .addDemonstartion('./img/fractals_demo.gif')
        .addNavigation()
        .addPage(` Хочеш дізнатись більше інформації про фрактал? <b><u><a href="hhttps://fractalsaco.weebly.com/julia-set.html">Тисни!</a></u></b> (або <b><u><a href="https://pi.math.cornell.edu/~klindsey/presentations/MandelbrotReport.pdf"> сюди</a></u></b>) `)
        .addText(`<b>Множини Жюлія</b> є надмножиною <b>множин Мандельброта</b>, перетином яких є всі нероздільні
            результати Жюлія. Ґенеруються вони також схожим способом до множини Мандельброта, проте в формулі
            <b>z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c</b>, параметр <b>c</b> є константою, а <b>z</b> -
            точкою на площині.`)
        .addImage('./img/juliaSet1.gif', 'julia set illustration')
        .addText(`<b>Ґастон Жюлія</b> народився у <b>19 столітті</b> й вивчав поліноми та раціональні функції. Його
            здобутки були забуті, допоки у <b>1970</b> <b>Бенуа Мандельброт</b> не зґенерував множини Жюлія
            комп'ютерно.`)
        .addImages(['./img/juliaSet2.png', './img/juliaSet3.jpg'], ['julia set real-life illustration pt.1', 'julia set real-life illustration pt.2'])
        .addNavigation()
        .build()

    document.getElementById('help-button').addEventListener('click', () => isDragon ? dragonHelp.open() : juliaHelp.open())
    document.getElementById('exit-help-button').addEventListener('click', () => {
        juliaHelp.quit()
        onResize()
    })
});