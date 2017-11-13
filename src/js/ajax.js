import $ from 'jquery';

class Ajax {
    constructor() {
        this.ajaxButton  = $('.ajaxButton');
        this.lastArticle = $('.article:last-child');
    }

    appendStaticArticle() {
        $.ajax({
            type: 'GET',
            url: './html/ajax.html',
            success: function (response) {
                this.lastArticle.append(response.html);
            },
            error: function() {
                console.log('An error occured in the AJAX call.');
            }
        });
    }

    init() {
        try {
            this.ajaxButton
                .on('click', this.appendStaticArticle);

        } catch (e) {
            console.error(e, e.stack);
        }
    }
}

const ajax = new Ajax().init();

export default ajax;