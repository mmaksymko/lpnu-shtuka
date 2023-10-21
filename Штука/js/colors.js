let colorsSlider = document.getElementById('colors-slider')
let colorsSliderValueElement = document.getElementById('colors-value')

colorsSliderValueElement.innerHTML = colorsSlider.value
colorsSlider.addEventListener('input', () => {
    colorsSliderValueElement.innerHTML = colorsSlider.value
    adjustImage()
})


let picture = document.getElementById('picture')
readImage = async () => await Jimp.read(picture.src)
let photo = readImage()
let resultPhoto = readImage()
let result = null

addImage = (imageLocation) => {
    picture.src = imageLocation
}

document.getElementById('open-image').addEventListener('input', event => {
    const [file] = event.target.files
    if (file) {
        let image = URL.createObjectURL(file)
        addImage(image)
        photo = readImage()
        adjustImage()
    }
});

getHSL = (ph, x, y) => {
    let rgba = Jimp.intToRGBA(ph.getPixelColor(x, y))
    return ColorsManager.RGBToHSL(rgba.r, rgba.g, rgba.b)
}

adjustImage = async () => {
    let ph = await photo
    ph = ph.clone()

    for (let i = 0; i != ph.bitmap.width; ++i) {
        for (let j = 0; j != ph.bitmap.height; ++j) {
            let hsl = getHSL(ph, i, j)
            if ((hsl[0] > 0 & hsl[0] <= 30) || hsl[0] >= 330) {

                hsl[1] = Math.min(Math.abs(hsl[1]), 1)
                hsl[2] = hsl[2] / 255 + colorsSlider.value / 100.0 - 0.5
                hsl[2] = hsl[2] < 0 ? 0 : hsl[2]
                hsl[2] = hsl[2] > 1 ? 1 : hsl[2]

                ph.setPixelColor(ColorsManager.RGBToHexA(...ColorsManager.HSLToRGB(...hsl)), i, j)
            }
        }
    }

    resultPhoto = ph
    ph.getBase64(Jimp.AUTO, (err, newImageURI) => {
        addImage(newImageURI)
        result = newImageURI
    })
}
adjustImage()

document.getElementById('save-image').addEventListener('click', () => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = result;
    downloadLink.target = '_self';
    downloadLink.download = `result_${Date.now()}`;
    downloadLink.click();
})

picture.addEventListener('click', (e) => {
    let x
    let y

    if ((e.target.naturalHeight / e.target.naturalWidth) > (e.target.parentNode.offsetHeight / e.target.parentNode.offsetWidth))
        [x, y] = [(e.x - (e.target.parentNode.offsetWidth - e.target.naturalWidth / (e.target.naturalHeight / e.target.parentNode.offsetHeight)) / 2 - e.target.parentNode.offsetLeft - 9), (e.y - e.target.offsetTop)]
    else if ((e.target.naturalHeight / e.target.naturalWidth) < (e.target.parentNode.offsetHeight / e.target.parentNode.offsetWidth))
        [x, y] = [(e.x - e.target.offsetLeft), (e.y - (e.target.parentNode.offsetHeight - e.target.naturalHeight / (e.target.naturalWidth / e.target.parentNode.offsetWidth)) / 2 - e.target.parentNode.offsetTop)]
    else
        [x, y] = [(e.x - e.target.offsetLeft), (e.y - e.target.offsetTop)]

    x = Math.ceil(x * e.target.naturalWidth / e.target.offsetWidth)
    y = Math.ceil(y * e.target.naturalHeight / e.target.offsetHeight)

    setPixelsInfo(Jimp.intToRGBA(resultPhoto.getPixelColor(x, y)))
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

    rgbValues.parentNode.style.background = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`
    rgbValues.innerHTML = `RGB: (${rgba.r}, ${rgba.g}, ${rgba.b})`
    hslValues.parentNode.style.background = `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`
    hslValues.innerHTML = `HSL: (${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%)`
    if (hsl[2] < 40) {
        rgbValues.style.color = 'white'
        hslValues.style.color = 'white'
    } else {
        rgbValues.style.color = 'black'
        hslValues.style.color = 'black'
    }
}

let currHelpPage
helpPages = document.getElementsByClassName('colors-help')
helpFooters = document.querySelectorAll('.help-footer>span')

document.getElementById('colors-help-button').addEventListener('click', () => {
    document.getElementsByClassName('page-container')[0].style.display = 'none'
    document.getElementsByClassName('help-container')[0].style.display = 'flex'
    helpPages[0].style.display = 'flex'
    helpFooters[0].style.display = 'flex'
    currHelpPage = 0
})

document.getElementById('prev-help-button').addEventListener('click', () => {
    helpPages[currHelpPage].style.display = 'none'
    helpFooters[currHelpPage].style.display = 'none'

    if (helpPages.length === ++currHelpPage)
        currHelpPage = 0

    helpPages[currHelpPage].style.display = 'flex'
    helpFooters[currHelpPage].style.display = 'flex'
})

document.getElementById('next-help-button').addEventListener('click', () => {
    helpPages[currHelpPage].style.display = 'none'
    helpFooters[currHelpPage].style.display = 'none'

    if (--currHelpPage === -1)
        currHelpPage = helpPages.length - 1

    helpPages[currHelpPage].style.display = 'flex'
    helpFooters[currHelpPage].style.display = 'flex'
})

document.getElementById('exit-help-button').addEventListener('click', () => {
    helpPages[currHelpPage].style.display = 'none'
    helpFooters[currHelpPage].style.display = 'none'
    document.getElementsByClassName('page-container')[0].style.display = 'flex'
})