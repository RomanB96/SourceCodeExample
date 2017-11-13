class Css {
    constructor() {
        this.cssLink;
    }

    appendCss(callback, ...href) {
        var cssLoaded = 0;

        for (let i = 0; i < href.length; i++) {
            this.cssLink      = document.createElement('link');
            this.cssLink.rel  = 'stylesheet';
            this.cssLink.href = href[i];
            this.cssLink.type = 'text/css';

            this.cssLink.onload = function () {
                cssLoaded++;
                if (cssLoaded === href.length)
                    callback();
            };

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