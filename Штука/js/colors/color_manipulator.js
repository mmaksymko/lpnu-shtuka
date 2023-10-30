class ColorManipulator {

    constructor(source) {
        this.uploadPhoto(source)
    }

    uploadPhoto = (source) => {
        this.photo = this.#readImage(source)
        this.resultPhoto = this.#readImage(source)
        this.result = null
        this.adjustImage()
    }

    adjustImage = async () => {
        let ph = await this.photo
        ph = ph.clone()

        for (let i = 0; i != ph.bitmap.width; ++i) {
            for (let j = 0; j != ph.bitmap.height; ++j) {
                let hsl = this.#getHSL(ph, i, j)
                if ((hsl[0] > 0 & hsl[0] <= 30) || hsl[0] >= 330) {

                    hsl[1] = Math.min(Math.abs(hsl[1]), 1)
                    hsl[2] = hsl[2] / 255 + colorsSlider.value / 100.0 - 0.5
                    hsl[2] = hsl[2] < 0 ? 0 : hsl[2]
                    hsl[2] = hsl[2] > 1 ? 1 : hsl[2]

                    ph.setPixelColor(ColorsManager.RGBToHexA(...ColorsManager.HSLToRGB(...hsl)), i, j)
                }
            }
        }

        this.resultPhoto = ph
        ph.getBase64(Jimp.AUTO, (err, newImageURI) => {
            this.result = newImageURI
        })
        return this.result
    }

    #readImage = async (source) => this.photo = await Jimp.read(source)

    #getHSL = (ph, x, y) => {
        let rgba = Jimp.intToRGBA(ph.getPixelColor(x, y))
        return ColorsManager.RGBToHSL(rgba.r, rgba.g, rgba.b)
    }
}