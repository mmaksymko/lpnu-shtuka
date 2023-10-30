class HelpBuilder {
    constructor(body, pageContainer) {
        this.helpContainer = document.createElement('div')
        this.helpContainer.classList.add('page-container')
        this.helpContainer.classList.add('help-container')
        this.helpContainer.style.display = 'none';
        this.header = document.createElement('header')
        this.header.classList.add('header-footer')
        this.header.classList.add('help-header')
        this.header.innerHTML = `
            <text class="logo" title="ШТУКА навчає не лише візуально, а й дає трішки теорії!">
                <a href="index.html"><b>ШТУКА-ПОМІЧНА</b></a>
            </text>
            <div class="svg-button-container" id="exit-help-button" title="Повернутись до попередньої сторінки">
                <svg class="svg-button exit-help-button" width="3.5em" viewBox="2 2 20 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="m21 12c0 4.9706-4.0294 9-9 9-4.9706 0-9-4.0294-9-9 0-4.9706 4.0294-9 9-9 4.9706 0 9 4.0294 9 9z" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path d="m9.5 9.4185 5 5m0-5-5 5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>    
            </div>`
        this.mains = []
        this.footers = []
        this.body = body
        this.pageContainer = pageContainer
        this.helpContainer.append(this.header)
    }

    build = () => new Help(this.body, this.helpContainer, this.pageContainer, this.mains, this.footers)

    addPage = (footerText) => {
        let main = document.createElement('main')
        main.classList.add('main')
        main.classList.add('help-main')
        main.style.display = 'flex';

        let footer = document.createElement('footer')
        footer.classList.add('header-footer')
        footer.classList.add('footer')
        let span = document.createElement('span')
        let text = document.createElement('text')
        text.innerHTML = footerText
        span.append(text)
        footer.append(span)

        this.mains.push(main)
        this.footers.push(footer)

        this.helpContainer.append(main)
        this.helpContainer.append(footer)

        return this
    }

    addText = (txt) => {
        let text = document.createElement('text')
        text.innerHTML = txt
        this.mains[this.mains.length - 1].append(text)
        return this
    }

    addDemonstartion = (src, alt = 'demonstration') => {
        let helpImage = document.createElement('img')
        helpImage.classList.add('demonstration')
        helpImage.src = src
        helpImage.alt = alt
        this.mains[this.mains.length - 1].append(helpImage)
        return this
    }

    addImage = (src, alt) => {
        let helpImage = document.createElement('img')
        if (src.slice(-3) === 'gif')
            helpImage.classList.add('help-gif')
        else
            helpImage.classList.add('help-image')
        helpImage.src = src
        helpImage.alt = alt
        this.mains[this.mains.length - 1].append(helpImage)
        return this
    }

    addImages = (src, alt) => {
        let helpImages = document.createElement('div')
        helpImages.classList.add('help-images')
        if (src.length !== alt.length)
            return this
        for (let i = 0; i != src.length; ++i)
            helpImages.innerHTML += `<img src="${src[i]}" alt="${alt[i]}">`
        this.mains[this.mains.length - 1].append(helpImages)
        return this
    }

    addLineBreak = () => {
        this.mains[this.mains.length - 1].append(document.createElement('br'))
        return this
    }

    #prevHelp = null
    #nextHelp = null
    addNavigation = () => {
        let prev, next
        if (!this.#prevHelp) {
            this.#prevHelp = document.createElement('div')
            this.#prevHelp.setAttribute("id", "prev-help-button");
            this.#prevHelp.title = 'Попередня сторінка допомоги'
            this.#prevHelp.classList.add('svg-button-container')
            this.#prevHelp.innerHTML = `
            <svg class="svg-button help-nav-page-button prev" width="3.5em" fill="none" viewBox="2 2 21 20" xmlns="http://www.w3.org/2000/svg">
                <path d="m11 9-3 3m0 0 3 3m-3-3h8m5 0c0 4.9706-4.0294 9-9 9-4.9706 0-9-4.0294-9-9 0-4.9706 4.0294-9 9-9 4.9706 0 9 4.0294 9 9z" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>`
            this.#nextHelp = document.createElement('div')
            this.#nextHelp.setAttribute("id", "next-help-button");
            this.#nextHelp.title = 'Наступна сторінка допомоги'
            this.#nextHelp.classList.add('svg-button-container')
            this.#nextHelp.innerHTML = `
            <svg class="svg-button help-nav-page-button next" width="3.5em" fill="none" viewBox="2 2 21 20" xmlns="http://www.w3.org/2000/svg">
                <path d="m13 15 3-3m0 0-3-3m3 3h-8m13 0c0 4.9706-4.0294 9-9 9-4.9706 0-9-4.0294-9-9 0-4.9706 4.0294-9 9-9 4.9706 0 9 4.0294 9 9z" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>`
            prev = this.#prevHelp
            next = this.#nextHelp
        } else {
            prev = this.#prevHelp.cloneNode(true);
            next = this.#nextHelp.cloneNode(true);
        }

        this.footers[this.footers.length - 1].prepend(prev)
        this.footers[this.footers.length - 1].classList.add('help-footer')
        this.footers[this.footers.length - 1].append(next)
        return this
    }
}