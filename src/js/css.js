class Css {
    constructor() {
        this.cssLink;
    }

    appendCss(callback, ...href) {
        for (let i = 0; i < href.length; i++) {
            this.cssLink      = document.createElement('link');
            this.cssLink.rel  = 'stylesheet';
            this.cssLink.href = href[i];
            this.cssLink.type = 'text/css';

            if (this.cssLink.readyState) {  // IE
                this.cssLink.onreadystatechange = function () {
                    if (this.cssLink.readyState === "loaded" || this.cssLink.readyState === "complete") {
                        this.cssLink.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  // !IE
                this.cssLink.onload = callback;
            }
    
            document
                .getElementsByTagName('head')[0]
                .appendChild(this.cssLink);
        }
    }

    init(callback) {
        try {            
            this.appendCss(callback, 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i', './index.css');
        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const css = new Css();

export default css;