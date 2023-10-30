let colorsSlider = document.getElementById('colors-slider')
let colorsSliderValueElement = document.getElementById('colors-value')

colorsSliderValueElement.innerHTML = colorsSlider.value
colorsSlider.addEventListener('input', () => {
    colorsSliderValueElement.innerHTML = colorsSlider.value
    colorManipulator.adjustImage().then(res => addImage(res))
})

let picture = document.getElementById('picture')

let colorManipulator = new ColorManipulator(picture.src)

addImage = (imageLocation) => {
    picture.src = imageLocation
}

document.getElementById('open-image').addEventListener('input', event => {
    const [file] = event.target.files
    if (file) {
        let image = URL.createObjectURL(file)
        addImage(image)
        colorManipulator.uploadPhoto(image)
    }
});

document.getElementById('save-image').addEventListener('click', () => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = colorManipulator.result;
    downloadLink.target = '_self';
    downloadLink.download = `result_${Date.now()}`;
    downloadLink.click();
})

picture.addEventListener('click', (e) => {
    let rect = e.target.getBoundingClientRect()
    let onCanvasX = e.clientX - rect.left
    let onCanvasY = e.clientY - rect.top

    let scale = e.target.naturalWidth / e.target.offsetWidth
    let x = Math.ceil(onCanvasX * scale)
    let y = Math.ceil(onCanvasY * scale)
    setPixelsInfo(Jimp.intToRGBA(colorManipulator.resultPhoto.getPixelColor(x, y)))
})

rgbValues = document.getElementById('rgb')
hslValues = document.getElementById('hsl')
setPixelsInfo = (rgba) => {
    if (!rgba) {
        rgba = { r: 0, g: 0, b: 0 }
    }

    hsl = ColorsManager.RGBToHSL(rgba.r, rgba.g, rgba.b)
    hsl[0] = Math.round((hsl[0] + Number.EPSILON) * 100) / 100
    hsl[1] = Math.round((Math.abs(hsl[1]) + Number.EPSILON) * 10000) / 100
    hsl[2] = Math.round((hsl[2] / 255 + Number.EPSILON) * 10000) / 100

    rgbValues.innerHTML = `RGB: (${rgba.r}, ${rgba.g}, ${rgba.b})`
    hslValues.innerHTML = `HSL: (${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%)`

    rgbValues.parentNode.style.background = hslValues.parentNode.style.background = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`
    rgbValues.style.color = hslValues.style.color = (hsl[2] < 40) ? 'white' : 'black'
}

window.addEventListener("load", (event) => {
    let help = new HelpBuilder(document.querySelector('body'), document.getElementsByClassName('page-container')[0])
        .addPage(``)
        .addText(`<b>Демонстрація</b>`)
        .addDemonstartion('./img/colors_demo.gif')
        .addNavigation()
        .addPage(`Хочеш дізнатись більше про <b>RGB</b>? <b><u><a href="https://www.colorsexplained.com/rgb-color-model/">Тисни!</a></u></b>`)
        .addText(`<b>RGB</b> <b><i>(Red, Green, Blue — червоний, зелений, синій)</b></i> — колірна модель, що описує
            спосіб змішання кольору, за яким <b>червоне</b>, <b>зелене</b> та <b>синє</b> світло накладаються разом,
            змішуючись у різноманітні кольори. Перше зображення на ілюстрації отримано накладанням наступних трьох.`)
        .addImages(['./img/color-model-example.png', './img/rgb-red-example.png', './img/rgb-green-example.png', './img/rgb-blue-example.png'], ['rgb combine example', 'rgb red example', 'rgb green example', 'rgb blue example'])
        .addText(`Модель <b>RGB</b> залежна від пристроїв відображення, себто на різних пристроях кольори можуть
            <b>різнитись</b>, адже залежні від елементів відтворення. Типовими </i>вхідними</i> <b>RGB</b>
            пристроями є ТБ, відеокамери, сканери, </i>вихідними</i> - дисплеї різних технологій (CRT, LCD, плазма, OLED тощо)`)
        .addImages(['./img/rgb1.jpg', './img/rgb2.webp'], ['rgb example', 'rgb example'])
        .addNavigation()
        .addPage(`Хочеш дізнатись більше про <b>HSL</b>? <b><u><a href="https://giggster.com/guide/basics/hue-saturation-lightness/">Тисни!</a></u></b>`)
        .addText(`<b>HSL</b> <b><i>(Hue, Saturation, Lightness - відтінок, насиченість, світлість)</b></i> - циліндрична
           колірна модель, що переводить точки з <b>RGB</b> в більш <b>інтуїтивну</b> для людини систему.`)
        .addImages(['./img/hsl1.png', './img/hsl2 (rgb2hsl).gif'], ['rgb to hsl', 'rgb to hsl'])
        .addText(`<b>Відтінок</b> - кут кольору на колі RGB <i>(0 - червоний, 120 - зелений, 240 - синій)</i> <br>
            <b>Насиченість</b> контролює кількість використаного кольору`)
        .addLineBreak()
        .addText(`<b>Освітленість</b> ж показує світлість кольору <i>(0 - чорний, 50 - найчистіший колір, 100 - білий)</i>`)
        .addImages(['./img/color-model-example.png', './img/hsl-hue-example.jpg', './img/hsl-saturation-example.jpg', './img/hsl-light-example.jpg'], ['hsl combine example', 'hsl hue example', 'hsl saturation example', 'hsl lightness example'])
        .addNavigation().build()

    document.getElementById('help-button').addEventListener('click', () => help.open())
    document.getElementById('exit-help-button').addEventListener('click', () => help.quit())
});