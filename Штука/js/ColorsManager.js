class ColorsManager {
    // static HSLToHSV = (h, s, l, v = s * Math.min(l, 1 - l) + l) => [h, v ? 2 - 2 * l / v : 0, v];

    // static RGBToHex = (r, g, b) => parseInt([r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join(''), 16);

    static RGBToHexA = (r, g, b) => parseInt([r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('') + 'FF', 16);

    // static HSVToHSL = (h, s, v, l = v - v * s / 2, m = Math.min(l, 1 - l)) => [h, m ? (v - l) / m : 0, l];

    // static RGBToHSV = (r, g, b) => {
    //     let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    //     let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
    //     return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
    // }

    // static HSVToRGB = (h, s, v) => {
    //     let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    //     return [f(5), f(3), f(1)];
    // }

    static complementaryColor = (r, g, b) => {
        let hsl = this.RGBToHSL(r, g, b)
        return this.HSLToRGB((hsl[0] + 180) % 360, hsl[1], hsl[2])
    }

    static splitComplementaryColors = (r, g, b) => {
        let hsl = this.RGBToHSL(r, g, b)
        return [this.HSLToRGB((hsl[0] + 150) % 360, hsl[1], hsl[2]),
        this.HSLToRGB((hsl[0] + 210) % 360, hsl[1], hsl[2])]
    }

    static triadicColors = (r, g, b) => {
        let hsl = this.RGBToHSL(r, g, b)
        return [this.HSLToRGB((hsl[0] + 120) % 360, hsl[1], hsl[2]),
        this.HSLToRGB((hsl[0] + 240) % 360, hsl[1], hsl[2])]
    }

    // static binToRGB = (binary) => {
    //     let parsed = parseInt(binary, 2);
    //     let r = parsed >> 16;
    //     let g = parsed >> 8 & 0xFF;
    //     let b = parsed & 0xFF;
    //     return [r, g, b]
    // }

    // static hexToBin = (hex) => ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);

    static hexToRGB = (hex) =>
        hex.length != 6 ? [0, 0, 0] : [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];

    static RGBToHSL = (r, g, b) => {
        let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = (1 - Math.abs(v + v - c - 1));
        let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
        return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
    }

    static HSLToRGB(h, s, l) {
        let a = s * Math.min(l, 1 - l);
        let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [f(0), f(8), f(4)];
    }
}