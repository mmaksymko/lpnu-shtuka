class Help {
    constructor(body, helpContainer, pageContainer, mains, footers) {
        this.helpContainer = helpContainer
        this.pageContainer = pageContainer
        this.index = 0
        this.mains = mains
        this.footers = footers
        body.append(this.helpContainer)

        for (let e of document.querySelectorAll('.help-nav-page-button.prev'))
            e.addEventListener('click', () => this.open(this.index - 1))
        for (let e of document.querySelectorAll('.help-nav-page-button.next'))
            e.addEventListener('click', () => this.open(this.index + 1))
    }

    quit = () => {
        this.pageContainer.style.display = 'flex'
        this.helpContainer.style.display = 'none'
        this.index = 0
    };

    open = (index = 0) => {
        this.pageContainer.style.display = 'none'
        this.index = index >= this.mains.length ? 0 : index < 0 ? this.mains.length - 1 : index

        this.helpContainer.style.display = 'flex';
        this.mains.forEach(main => main.style.display = 'none');
        this.footers.forEach(footer => footer.style.display = 'none');

        this.mains[this.index].style.display = 'flex'
        this.footers[this.index].style.display = 'flex'
    }
}