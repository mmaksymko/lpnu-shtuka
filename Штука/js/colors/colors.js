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
    let onCanvasX = e.x - e.target.offsetLeft
    let onCanvasY = e.y - e.target.offsetTop
    let x = Math.ceil(onCanvasX * e.target.naturalWidth / e.target.offsetWidth)
    let y = Math.ceil(onCanvasY * e.target.naturalHeight / e.target.offsetHeight)
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

let currHelpPage
helpPages = document.getElementsByClassName('colors-help')
helpFooters = document.querySelectorAll('.help-footer>span')

document.getElementById('colors-help-button').addEventListener('click', () => {
    document.getElementsByClassName('page-container')[0].style.display = 'none'
    document.getElementsByClassName('help-container')[0].style.display = 'flex'
    helpPages[0].style.display = helpFooters[0].style.display = 'flex'
    currHelpPage = 0
})

document.getElementById('prev-help-button').addEventListener('click', () => {
    helpPages[currHelpPage].style.display = helpFooters[currHelpPage].style.display = 'none'

    if (helpPages.length === ++currHelpPage)
        currHelpPage = 0

    helpPages[currHelpPage].style.display = helpFooters[currHelpPage].style.display = 'flex'
})

document.getElementById('next-help-button').addEventListener('click', () => {
    helpPages[currHelpPage].style.display = helpFooters[currHelpPage].style.display = 'none'

    if (--currHelpPage === -1)
        currHelpPage = helpPages.length - 1

    helpPages[currHelpPage].style.display = helpFooters[currHelpPage].style.display = 'flex'
})

document.getElementById('exit-help-button').addEventListener('click', () => {
    document.getElementsByClassName('help-container')[0].style.display = 'none'
    document.getElementsByClassName('page-container')[0].style.display = 'flex'
    helpPages[currHelpPage].style.display = helpFooters[currHelpPage].style.display = 'none'
})