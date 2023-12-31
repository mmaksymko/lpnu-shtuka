
let cnv, canvas = document.getElementById("canvas")

let geometryManager

let minX = -5, minY = -5, maxX = 5, maxY = 5
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

let scaleDownButton = document.getElementById('scale-down-button')
let scaleUpButton = document.getElementById('scale-up-button')

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
            ++minX
            if (maxX - minX - 1 != 0) {
                --maxX
            }
        }
        if (maxY - minY - 1 != 0) {
            ++minY
            if (maxY - minY - 1 != 0) {
                --maxY
            }
        }
    }
    onResize()
})

scaleToFit = () => {
    let maxX = Math.max(geometryManager.triangle.a.x, geometryManager.triangle.b.x, geometryManager.triangle.c.x)
    let maxY = Math.max(geometryManager.triangle.a.y, geometryManager.triangle.b.y, geometryManager.triangle.c.y)
    let minX = Math.min(geometryManager.triangle.a.x, geometryManager.triangle.b.x, geometryManager.triangle.c.x)
    let minY = Math.min(geometryManager.triangle.a.y, geometryManager.triangle.b.y, geometryManager.triangle.c.y)

    while (geometryManager.maxVisible.x > maxX && geometryManager.maxVisible.y > maxY && geometryManager.minVisible.x < minX && geometryManager.minVisible.y < minY && geometryManager.maxVisible.x > 15 && geometryManager.maxVisible.y > 6) {
        scaleUpButton.click()
    }
    while (geometryManager.maxVisible.x + 1 < maxX || geometryManager.maxVisible.y + 1 < maxY || geometryManager.minVisible.x + 1 > minX || geometryManager.minVisible.y > minY) {
        scaleDownButton.click()
    }
    scaleDownButton.click()
}

printError = (error) => alert(error)

document.getElementById('generate-triangle-button').addEventListener('click', () => {
    let inputs = document.getElementsByClassName("triangle-axis-point")
    for (let input of inputs)
        if (!input.value) {
            printError('Введіть валідні чисельні дані! Можливо ви ввели літеру або інший нецифровий символ.')
            return
        } else if (input.value > Math.abs(50_000_000)) {
            printError('Ви вийшли за рамки, далі обчислення були б заповільними! Рекомендуємо зменшити трикутника (вводячи як коефіцієнт зібльшення значення в межах (0; 1) або зґенерувати нового!')
            return
        }
    try {
        geometryManager.drawTriangle(new Triangle(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value))
        scaleToFit()
    } catch (e) {
        printError(e)
    }
})

document.getElementById('random-triangle-button').addEventListener('click', () => {
    let inputs = document.getElementsByClassName("triangle-axis-point")
    let triangle = geometryManager.getRandomTriangle()
    for (let i = 0; i != inputs.length; ++i) {
        inputs[i].value = triangle[i]
    }
    document.getElementById('generate-triangle-button').click()
})

document.getElementById('translate-button').addEventListener('click', (e) => {
    if (!document.getElementById('triangle-scale').value) {
        printError('Введіть валідні дані! Поле порожнє або містить не цифрові символи.')
        return
    }
    let factor = document.getElementById('triangle-scale').value
    if (factor <= 0) {
        printError('Трикутник не може мати від\'ємної площі! Введіть додатнє значення.')
        return
    }
    if (Math.max(factor * Math.abs(geometryManager.maxVisible.x), factor * Math.abs(geometryManager.maxVisible.y), factor * Math.abs(geometryManager.minVisible.x), factor * Math.abs(geometryManager.minVisible.y)) > 50_000_000) {
        printError('Ви вийшли за рамки, далі обчислення були б заповільними! Рекомендуємо зменшити трикутника (вводячи як коефіцієнт зібльшення значення в межах (0; 1) або зґенерувати нового!')
        return
    }
    geometryManager.mirrorAndScale(document.getElementById('triangle-scale').value)
    scaleToFit()
})

document.getElementById('save-button').addEventListener('click', () => saveCanvas(cnv, 'myCanvas', 'png'))

window.addEventListener("load", (event) => {
    let help = new HelpBuilder(document.querySelector('body'), document.getElementsByClassName('page-container')[0])
        .addPage(``)
        .addText(`<b>Демонстрація</b>`)
        .addDemonstartion('./img/geometry_demo.gif')
        .addNavigation()
        .addPage(`Хочеш дізнатись більше про <b>афінні перетворення</b>? <b><u><a href="https://www.cs.umd.edu/class/fall2018/cmsc425/Lects/lect06-affine-xform.pdf">Тисни!</a></u></b>`)
        .addText(`<b>Афінне перетворення</b> <b><i>(лат. affinis, «пов'язаний з»)</i></b> — відображення площини або простору в собі, при якому <b>паралельні</b> прямі переходять у <b>паралельні</b> прямі, <b>пересічні</b> — в <b>пересічні</b>, <b>мимобіжні</b> — в <b>мимобіжні</b>.`)
        .addImage('./img/affineTransofrmations.png', 'affine tranformations')
        .addText(`Зазвичай лінійна алгебра використовує <b>матриці</b> для представлення <b>лінійних перетворень</b>, і <b>векторну суму</b> для представлення паралельних перенесень.`)
        .addImages(['./img/affineFormula1.png', './img/affineFormula2.png', './img/affineFormula3.png', './img/affineFormula4.png'], ['affine formula pt1', 'affine formula pt2', 'affine formula pt3', 'affine formula pt4'])
        .addNavigation()
        .addPage(`Хочеш дізнатись більше про <b>зсув</b> та <b>масшатабування</b>? <b><u><a href="https://dirsig.cis.rit.edu/docs/new/affine.html">Тисни!</a></u></b>`)
        .addText(`<b>Зсув</b>`)
        .addText(`Зсув на фіксований вектор <b><i>v</i></b> переносить кожну точку на <i><b>p</i></b> to <i><b>p + ~v</i></b>`)
        .addImages(['./img/affineTranslation1.png', './img/affineTranslation2.png', './img/affineTranslation3.png'], ['affine translation', 'affine translation pt2', 'affine translation pt3'])
        .addLineBreak()
        .addText(`<b>Масштабування</b> об’єктів - розтягнення об'єктів вздовж відповідних осей
            координат відносно початку координат. Ця операція застосовується до кожної точки об'єкта,
            тому можна також говорити про масштабування точки`)
        .addImages(['./img/affineScaling1.png', './img/affineScaling2.png', './img/affineScaling3.png'], ['affine scaling pt1', 'affine scaling pt2', 'affine scaling pt3'])
        .addNavigation()
        .addPage(`Хочеш дізнатись більше про <b>відбиття</b> та <b>поворот</b>? <b><u><a href="https://people.computing.clemson.edu/~dhouse/courses/401/notes/affines-matrices.pdf">Тисни!</a></u></b>`)
        .addText(`<b>Відбиття</b> <b><i>(рефлексія)</i></b> у своїй загальній форміє є віддзеркаленням шляхом перевертання усіх точок. 
            Відбиття у тривимірному просторі є особливою формою масштабування з негативним фактором.`)
        .addImages(['./img/affineReflection1.png', './img/affineReflection2.png', './img/affineReflection4.png', './img/affineReflection5.png'], ['affine reflection pt1', 'affine reflection pt2', 'affine reflection pt4', 'affine reflection pt5'])
        .addLineBreak()
        .addText(`<b>Поворот</b> у своїй загальній формі визначається, як перетворення кожної точки навколо 
            якогось вектора у просторі. Виділяють 3 базові повороти: навколо осі <b><i>x</i></b>, <b><i>y</i></b> та <b><i>z</i></b>.`)
        .addImages(['./img/affineRotation1.png', './img/affineRotation2.png', './img/affineRotation3.png'], ['affine rotation pt1', 'affine rotation pt2', 'affine rotation pt3'])
        .addNavigation()
        .build()

    document.getElementById('help-button').addEventListener('click', () => help.open())
    document.getElementById('exit-help-button').addEventListener('click', () => help.quit())
});