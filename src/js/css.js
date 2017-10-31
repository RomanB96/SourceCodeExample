class Css {
    constructor() {
        this.cssLink;
    }

    appendCss() {
        document
            .getElementsByTagName('head')[0]
            .appendChild(this.cssLink);
    }

    init() {
        try {
            this.cssLink = document.createElement('link');
            this.cssLink.rel = 'stylesheet';
            this.cssLink.href = './index.css';
            this.cssLink.type = 'text/css';

            this.appendCss();
        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const css = new Css();

export default css;