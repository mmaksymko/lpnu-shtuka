class JuliaFractal {
    draw = (width, height, maxiterations, cReal, cImaginary, horizontalScale, color, colorModel) => {
        loadPixels();

        colorMode(RGB, 1);

        let verticalScale = (horizontalScale * height) / width;

        let y = -verticalScale / 2;
        for (let j = 0; j < height; j++) {
            let x = -horizontalScale / 2
            for (let i = 0; i < width; i++) {
                // перевірка чи прямує значення функції до нескінченності
                let currX = x;
                let currY = y;
                let iterations = 0;
                while (iterations < maxiterations) {
                    let xSquared = currX * currX;
                    let ySquared = currY * currY;

                    if (xSquared + ySquared > 4) {
                        break;
                    }

                    let twoab = 2 * currX * currY;
                    currX = xSquared - ySquared + cReal;
                    currY = twoab + cImaginary

                    iterations++;
                }

                let pix = (i + j * width) * 4;

                if (colorModel === 'complementary') {
                    let comp = ColorsManager.complementaryColor(...color)

                    if (iterations !== maxiterations) {
                        pixels[pix + 0] = comp[0];
                        pixels[pix + 1] = comp[1];
                        pixels[pix + 2] = comp[2];
                    }

                } else {
                    let resultColors = []
                    if (colorModel === 'split-complementary') {
                        resultColors = ColorsManager.splitComplementaryColors(...color)
                    } else if (colorModel === 'triadic') {
                        resultColors = ColorsManager.triadicColors(...color)
                    }
                    if (iterations < maxiterations / 3) {
                        pixels[pix + 0] = resultColors[0][0];
                        pixels[pix + 1] = resultColors[0][1];
                        pixels[pix + 2] = resultColors[0][2];
                    } else if (iterations < maxiterations / 3 && iterations < maxiterations) {
                        pixels[pix + 0] = resultColors[1][0];
                        pixels[pix + 1] = resultColors[1][1];
                        pixels[pix + 2] = resultColors[1][2];
                    }
                }
                if (iterations == maxiterations) {
                    pixels[pix + 0] = color[0];
                    pixels[pix + 1] = color[1];
                    pixels[pix + 2] = color[2]
                }

                x += horizontalScale / width;
            }
            y += verticalScale / height;
        }
        updatePixels();
    }

    #arr = [[-1, 0], [0, 0.5], [0.36, 0.1], [-0.1, 0.8], [-0.38, 0.6], [0.285, -0.5], [0.285, 0.012], [-0.8, 0.156], [-0.72, 0.1889]]
    getRandomValues = () => this.#arr[Math.floor(Math.random() * this.#arr.length)];
}
