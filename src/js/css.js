class Css {
    constructor() {
        this.cssLink;
    }

    appendCss(href) {
        this.cssLink      = document.createElement('link');
        this.cssLink.rel  = 'stylesheet';
        this.cssLink.href = href;
        this.cssLink.type = 'text/css';

        document
            .getElementsByTagName('head')[0]
            .appendChild(this.cssLink);
    }

    init() {
        try {            
            this.appendCss('https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i');
            this.appendCss('./index.css'); 
        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const css = new Css();

export default css;